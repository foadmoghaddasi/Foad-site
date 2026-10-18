import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { createCredentialStore } from '../tgcloud/lib/credentials.js';
import { createCredentialsEndpoints } from '../tgcloud/lib/credentials-endpoints.js';
import { createIntegrations } from '../tgcloud/lib/integrations.js';
import { makeHarness } from './helpers.mjs';

// Deliberately synthetic strings, never real provider credentials.
const first = 'offline-openai-fixture';
const second = 'offline-github-fixture';
const ownerContext = { initData: { user: { id: 7 } } };
class OfflineEndpointError extends Error {
  constructor(message, parameters) { super(message); this.parameters = parameters; }
}
function endpoints(h, db = h.db) {
  return createCredentialsEndpoints({ db, config: h.config, EndpointError: OfflineEndpointError, now: () => h.state.timestamp });
}
async function loadEndpoint(name, bindings) {
  const context = vm.createContext({});
  const sdk = new vm.SyntheticModule(Object.keys(bindings), function () {
    for (const [key, value] of Object.entries(bindings)) this.setExport(key, value);
  }, { context });
  const modules = new Map();
  async function load(url) {
    if (!modules.has(url.href)) {
      const source = await readFile(url, 'utf8');
      modules.set(url.href, new vm.SourceTextModule(source, { context, identifier: url.href }));
    }
    return modules.get(url.href);
  }
  const root = await load(new URL(`../tgcloud/endpoints/${name}.js`, import.meta.url));
  await root.link(async (specifier, parent) => {
    if (specifier === 'sdk') return sdk;
    return load(new URL(specifier, parent.identifier));
  });
  await root.evaluate();
  return root.namespace.default;
}

test('credential schema enforces exactly the two allowed names at the DB layer', async (t) => {
  const h = makeHarness(t);
  for (const name of ['TELEGRAM_BOT_TOKEN', 'other', 'openai_api_key']) {
    assert.throws(() => h.sqlite.prepare('INSERT INTO bot_credentials VALUES (?, ?, ?, ?)').run(name, first, 1, '7'));
  }
  await createCredentialStore(h.db).save({ openaiApiKey: first, githubToken: second }, 7);
  assert.equal(h.sqlite.prepare('SELECT count(*) AS n FROM bot_credentials').get().n, 2);
});

test('registration, replacement and blank-field preservation never return stored values', async (t) => {
  const h = makeHarness(t);
  const api = endpoints(h);
  assert.deepEqual(await api.access({}, ownerContext), { authorized: true });
  assert.deepEqual(await api.save({ openaiApiKey: first, githubToken: second }, ownerContext), { saved: true });
  const store = createCredentialStore(h.db);
  assert.equal(await store.resolve('OPENAI_API_KEY'), first);
  assert.equal(await store.resolve('GITHUB_TOKEN'), second);
  h.state.timestamp += 100;
  assert.deepEqual(await api.save({ openaiApiKey: 'offline-rotated', githubToken: '' }, ownerContext), { saved: true });
  assert.equal(await store.resolve('OPENAI_API_KEY'), 'offline-rotated');
  assert.equal(await store.resolve('GITHUB_TOKEN'), second);
  const audit = h.sqlite.prepare('SELECT updatedBy, updatedAt FROM bot_credentials WHERE name = ?').get('OPENAI_API_KEY');
  assert.equal(audit.updatedBy, '7');
  assert.equal(audit.updatedAt, h.state.timestamp);
});

test('absent, malformed or foreign identities are rejected before any database access', async (t) => {
  const h = makeHarness(t);
  let calls = 0;
  const api = endpoints(h, { async get() { calls += 1; }, async run() { calls += 1; } });
  const contexts = [undefined, {}, { initData: {} }, { initData: { user: { id: '7' } } }, { initData: { user: { id: -7 } } }, { initData: { user: { id: 8 } } }];
  for (const ctx of contexts) {
    assert.throws(() => api.access({}, ctx));
    await assert.rejects(api.save({ openaiApiKey: first, githubToken: second }, ctx));
  }
  assert.equal(calls, 0);
});

test('client-submitted identities or initData cannot impersonate the owner', async (t) => {
  const h = makeHarness(t);
  const api = endpoints(h);
  const spoofed = { openaiApiKey: first, userId: 7, initData: ownerContext.initData };
  await assert.rejects(api.save(spoofed, { initData: { user: { id: 8 } } }), (error) => error.parameters.code === 'FORBIDDEN');
  await assert.rejects(api.save(spoofed, ownerContext), (error) => error.parameters.code === 'INVALID_CREDENTIAL_INPUT');
  assert.equal(h.sqlite.prepare('SELECT count(*) AS n FROM bot_credentials').get().n, 0);
});

test('invalid values and extra names cannot change either credential', async (t) => {
  const h = makeHarness(t);
  const api = endpoints(h);
  await api.save({ openaiApiKey: first, githubToken: second }, ownerContext);
  for (const input of [
    {}, [], null, { openaiApiKey: '', githubToken: '' },
    { openaiApiKey: 'offline-changed', githubToken: 'bad\nvalue' },
    { openaiApiKey: 42 }, { openaiApiKey: null }, { openaiApiKey: 'bad value' },
    { openaiApiKey: 'x'.repeat(4097) }, { GITHUB_TOKEN: second },
    JSON.parse('{"__proto__": {"openaiApiKey": "spoof"}}'),
  ]) await assert.rejects(api.save(input, ownerContext));
  assert.equal(await createCredentialStore(h.db).resolve('OPENAI_API_KEY'), first);
  assert.equal(await createCredentialStore(h.db).resolve('GITHUB_TOKEN'), second);
});

test('a failure in either row rolls back both replacements', async (t) => {
  const h = makeHarness(t);
  const api = endpoints(h);
  await api.save({ openaiApiKey: first, githubToken: second }, ownerContext);
  h.sqlite.exec("CREATE TRIGGER refuse_github BEFORE UPDATE ON bot_credentials WHEN NEW.name = 'GITHUB_TOKEN' BEGIN SELECT RAISE(ABORT, 'offline failure'); END;");
  await assert.rejects(api.save({ openaiApiKey: 'offline-new-openai', githubToken: 'offline-new-github' }, ownerContext));
  assert.equal(await createCredentialStore(h.db).resolve('OPENAI_API_KEY'), first);
  assert.equal(await createCredentialStore(h.db).resolve('GITHUB_TOKEN'), second);
});

test('DB failures are sanitized rather than logged, echoed or attached as causes', async (t) => {
  const h = makeHarness(t);
  const db = { async run() { throw new Error(`SQL failure containing ${first} and ${second}`); }, async get() { throw new Error(first); } };
  const api = endpoints(h, db);
  await assert.rejects(api.save({ openaiApiKey: first, githubToken: second }, ownerContext), (error) => {
    assert.ok(!error.message.includes(first) && !error.message.includes(second));
    assert.equal(error.cause, undefined);
    return error.parameters.code === 'CREDENTIAL_SAVE_FAILED';
  });
  await assert.rejects(createCredentialStore(db).resolve('OPENAI_API_KEY'), { code: 'CREDENTIAL_STORE_UNAVAILABLE' });
});

test('unknown credential names cannot trigger reads; missing names have clear bot errors', async (t) => {
  const h = makeHarness(t);
  const store = createCredentialStore(h.db);
  await assert.rejects(store.resolve('TELEGRAM_BOT_TOKEN'), { code: 'INVALID_CREDENTIAL_NAME' });
  await assert.rejects(store.resolve('OPENAI_API_KEY'), (error) => error.code === 'CREDENTIAL_MISSING' && error.message.includes('OpenAI API Key'));
  await assert.rejects(store.resolve('GITHUB_TOKEN'), (error) => error.code === 'CREDENTIAL_MISSING' && error.message.includes('GitHub Token'));
});

test('actual SDK endpoint entry points use server context and only return safe acknowledgements', async (t) => {
  const h = makeHarness(t);
  const realOwner = { initData: { user: { id: Number((await import('../tgcloud/lib/config.js')).config.allowedUserId) } } };
  const bindings = { db: h.db, EndpointError: OfflineEndpointError };
  const access = await loadEndpoint('credentialsAccess', bindings);
  const save = await loadEndpoint('saveCredentials', bindings);
  assert.equal((await access({}, realOwner)).authorized, true);
  await assert.rejects(save({ openaiApiKey: first }, {}));
  const result = await save({ openaiApiKey: first, githubToken: second }, realOwner);
  assert.equal(JSON.stringify(result), '{"saved":true}');
});

test('integrations read credentials from SQLite and expose them only to their designated upstream', async (t) => {
  const h = makeHarness(t);
  await endpoints(h).save({ openaiApiKey: first, githubToken: second }, ownerContext);
  const destinations = [];
  const services = createIntegrations({
    api: h.api, config: h.config,
    FormData: class { append() {} }, InputFile: class {},
    resolveCredential: createCredentialStore(h.db).resolve,
    fetch: async (url, options) => {
      destinations.push({ url, authorization: options.headers.Authorization });
      return { ok: true, status: 200, async json() { return url.includes('openai.com') ? { text: 'موضوع' } : { workflow_run_id: 101 }; } };
    },
  });
  await services.transcribe({ file_id: 'offline-fixture' });
  await services.dispatch('موضوع');
  assert.equal(destinations[0].authorization, `Bearer ${first}`);
  assert.equal(destinations[1].authorization, `Bearer ${second}`);
  assert.equal(h.sent.length, 0);
});
