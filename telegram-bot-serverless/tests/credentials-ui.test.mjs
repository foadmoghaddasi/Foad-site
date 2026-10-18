import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { setImmediate } from 'node:timers/promises';
import { makeHarness } from './helpers.mjs';
import { createCredentialsEndpoints } from '../tgcloud/lib/credentials-endpoints.js';

const source = await readFile(new URL('../mini-app/settings.js', import.meta.url), 'utf8');
class Element {
  constructor() { this.value = ''; this.textContent = ''; this.dataset = {}; this.events = new Map(); }
  addEventListener(name, callback) { this.events.set(name, callback); }
  dispatch(name) { this.events.get(name)?.({ preventDefault() {} }); }
}
function browser({ call, initData = 'offline-auth-placeholder', hasTelegram = true } = {}) {
  const ids = ['credentials-form', 'credentials-fields', 'openai-key', 'github-token', 'save-credentials', 'access-status', 'save-status'];
  const elements = Object.fromEntries(ids.map((id) => [id, new Element()]));
  elements['credentials-form'].hidden = true;
  elements['credentials-fields'].disabled = true;
  const events = new Map();
  const forbidden = [];
  const window = {
    addEventListener(name, callback) { events.set(name, callback); },
    ...(hasTelegram ? { Telegram: { WebApp: { initData, ready() {}, Serverless: { call } } } } : {}),
  };
  for (const storage of ['localStorage', 'sessionStorage']) {
    Object.defineProperty(window, storage, { get() { forbidden.push(storage); throw new Error('Storage access forbidden'); } });
  }
  const context = vm.createContext({
    window,
    document: { getElementById(id) { return elements[id]; } },
    console: new Proxy({}, { get(_target, name) { return () => forbidden.push(`console.${String(name)}`); } }),
    fetch() { forbidden.push('fetch'); throw new Error('Must use official Mini App SDK'); },
  });
  vm.runInContext(source, context);
  return { elements, events, forbidden, window };
}

test('opening outside Telegram or without initData never unlocks or calls an endpoint', () => {
  for (const options of [{ hasTelegram: false }, { initData: '' }]) {
    let calls = 0;
    const ui = browser({ ...options, call() { calls += 1; } });
    assert.equal(ui.elements['credentials-form'].hidden, true);
    assert.equal(ui.elements['credentials-fields'].disabled, true);
    assert.equal(calls, 0);
  }
});

test('unverified initData and other users stay locked after server rejection', () => {
  const ui = browser({ call(name, _input, callback) {
    assert.equal(name, 'credentialsAccess');
    callback({ type: 'UNAUTHORIZED', message: 'untrusted server text' });
  } });
  assert.equal(ui.elements['credentials-form'].hidden, true);
  assert.ok(!ui.elements['access-status'].textContent.includes('untrusted server text'));
  assert.deepEqual(ui.forbidden, []);
});

test('no client-side user ID allowlist can unlock the page without server authorization', () => {
  const ui = browser({ call(_name, _input, callback) { callback(null, { authorized: false }); } });
  assert.equal(ui.elements['credentials-form'].hidden, true);
});

test('owner Mini App saves through the real endpoint service and SQLite, then clears fields', async (t) => {
  const h = makeHarness(t);
  class OfflineEndpointError extends Error {}
  const endpoints = createCredentialsEndpoints({ db: h.db, config: h.config, EndpointError: OfflineEndpointError });
  const ctx = { initData: { user: { id: 7 } } };
  const calls = [];
  const ui = browser({ call(name, payload, callback) {
    calls.push({ name, keys: Object.keys(payload) });
    Promise.resolve(name === 'credentialsAccess' ? endpoints.access(payload, ctx) : endpoints.save(payload, ctx))
      .then((result) => callback(null, result)).catch((error) => callback(error));
  } });
  await setImmediate();
  assert.equal(ui.elements['credentials-form'].hidden, false);
  ui.elements['openai-key'].value = 'offline-openai-fixture';
  ui.elements['github-token'].value = 'offline-github-fixture';
  ui.elements['credentials-form'].dispatch('submit');
  assert.equal(ui.elements['openai-key'].value, '');
  assert.equal(ui.elements['github-token'].value, '');
  assert.equal(ui.elements['credentials-fields'].disabled, true);
  await setImmediate();
  assert.equal(h.sqlite.prepare('SELECT count(*) AS n FROM bot_credentials').get().n, 2);
  assert.equal(ui.elements['credentials-fields'].disabled, false);
  assert.equal(ui.elements['save-status'].dataset.tone, 'success');
  assert.deepEqual(calls.map((call) => call.name), ['credentialsAccess', 'saveCredentials']);
  assert.deepEqual(ui.forbidden, []);
  for (const element of Object.values(ui.elements)) {
    assert.ok(!element.textContent.includes('offline-openai-fixture'));
    assert.ok(!element.textContent.includes('offline-github-fixture'));
  }
});

test('duplicate submissions are suppressed and successful responses cannot prefill keys', () => {
  let saveCallback;
  let saves = 0;
  const ui = browser({ call(name, _payload, callback) {
    if (name === 'credentialsAccess') callback(null, { authorized: true, openaiApiKey: 'never-display' });
    else { saves += 1; saveCallback = callback; }
  } });
  assert.equal(ui.elements['openai-key'].value, '');
  ui.elements['github-token'].value = 'offline-github-fixture';
  ui.elements['credentials-form'].dispatch('submit');
  ui.elements['credentials-form'].dispatch('submit');
  assert.equal(saves, 1);
  saveCallback(null, { saved: true, githubToken: 'never-display' });
  assert.equal(ui.elements['github-token'].value, '');
  assert.ok(!ui.elements['save-status'].textContent.includes('never-display'));
});

test('save errors never echo server messages and authorization loss hides the form', () => {
  const ui = browser({ call(name, _input, callback) {
    if (name === 'credentialsAccess') callback(null, { authorized: true });
    else callback({ type: 'UNAUTHORIZED', message: 'offline-key-in-error' });
  } });
  ui.elements['openai-key'].value = 'offline-openai-fixture';
  ui.elements['credentials-form'].dispatch('submit');
  assert.equal(ui.elements['credentials-form'].hidden, true);
  assert.equal(ui.elements['openai-key'].value, '');
  assert.ok(!ui.elements['save-status'].textContent.includes('offline-key-in-error'));
  assert.deepEqual(ui.forbidden, []);
});

test('page lifecycle clears any unsent values and secrets are never persisted by the UI', () => {
  const ui = browser({ call(_name, _input, callback) { callback(null, { authorized: true }); } });
  for (const event of ['pagehide', 'pageshow']) {
    ui.elements['openai-key'].value = 'offline-unsent';
    ui.events.get(event)();
    assert.equal(ui.elements['openai-key'].value, '');
  }
  assert.deepEqual(ui.forbidden, []);
});

test('static HTML has masked inputs and a locked form, with no stored-value display', async () => {
  const html = await readFile(new URL('../mini-app/index.html', import.meta.url), 'utf8');
  assert.equal((html.match(/type="password"/g) ?? []).length, 2);
  assert.match(html, /id="credentials-form"[^>]*hidden/);
  assert.match(html, /id="credentials-fields"[^>]*disabled/);
  assert.match(html, /Save Credentials/);
  assert.ok(!/\bvalue=/.test(html));
  assert.ok(!source.includes('initDataUnsafe'));
});
