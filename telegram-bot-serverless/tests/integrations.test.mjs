import test from 'node:test';
import assert from 'node:assert/strict';
import { createIntegrations } from '../tgcloud/lib/integrations.js';
import { config as defaults } from '../tgcloud/lib/config.js';
import { createCredentialStore } from '../tgcloud/lib/credentials.js';
import { makeHarness } from './helpers.mjs';

class OfflineFormData {
  fields = new Map();
  append(key, value) { this.fields.set(key, value); }
}
class OfflineInputFile {
  constructor(bytes, name, options) { Object.assign(this, { bytes, name, options }); }
}
const response = (data, status = 200) => ({ ok: status >= 200 && status < 300, status, async json() { return data; } });
function fixture(overrides = {}) {
  const calls = [];
  const config = { ...defaults, githubOwner: 'owner', githubRepo: 'repo' };
  const services = createIntegrations({
    config, FormData: OfflineFormData, InputFile: OfflineInputFile,
    api: { async getFileContent() { return new Uint8Array([1, 2, 3]); } },
    // A synthetic value used only in an offline transport; not an actual API key.
    resolveCredential: async () => 'offline-credential-placeholder',
    fetch: async (url, options) => { calls.push({ url, options }); return response({}); },
    ...overrides,
  });
  return { services, calls, config };
}

test('voice uses GPT-Transcribe with the SDK file helpers and new language hints', async () => {
  let form;
  const { services } = fixture({ fetch: async (url, options) => {
    assert.equal(url, 'https://api.openai.com/v1/audio/transcriptions');
    assert.equal(options.method, 'POST');
    assert.equal(options.headers['Content-Type'], undefined);
    form = options.body;
    return response({ text: 'متن ویس', languages: [{ code: 'fa' }] });
  } });
  assert.equal(await services.transcribe({ file_id: 'fixture', file_size: 3 }), 'متن ویس');
  assert.equal(form.fields.get('model'), 'gpt-transcribe');
  assert.equal(form.fields.get('languages[]'), 'fa');
  assert.equal(form.fields.has('language'), false);
  assert.equal(form.fields.get('response_format'), 'json');
  assert.equal(form.fields.get('file').name, 'voice.ogg');
  assert.equal(form.fields.get('file').options.type, 'audio/ogg');
});

test('voice size is rejected before downloading or calling providers', async () => {
  const { services, calls } = fixture();
  await assert.rejects(services.transcribe({ file_id: 'fixture', file_size: 21 * 1024 * 1024 }), { code: 'VOICE_LIMIT' });
  assert.equal(calls.length, 0);
});

test('missing database credentials block all provider requests', async (t) => {
  const h = makeHarness(t);
  const { services, calls } = fixture({ resolveCredential: createCredentialStore(h.db).resolve });
  await assert.rejects(services.dispatch('موضوع'), { code: 'CREDENTIAL_MISSING' });
  await assert.rejects(services.transcribe({ file_id: 'fixture' }), { code: 'CREDENTIAL_MISSING' });
  assert.equal(calls.length, 0);
});

test('dispatch uses the current API and records an exact ID without changing workflow inputs', async () => {
  const { services } = fixture({ fetch: async (url, options) => {
    assert.ok(url.endsWith('/actions/workflows/generate-bilingual-article.yml/dispatches'));
    assert.equal(options.headers['X-GitHub-Api-Version'], '2026-03-10');
    assert.deepEqual(JSON.parse(options.body), { ref: 'main', inputs: { topic: 'موضوع' } });
    return response({ workflow_run_id: 123, html_url: 'https://github.com/owner/repo/actions/runs/123' });
  } });
  assert.equal((await services.dispatch('موضوع')).workflowRunId, 123);
});

test('legacy empty dispatch responses are ambiguous and must not be automatically retried', async () => {
  const { services } = fixture({ fetch: async () => response(null, 204) });
  await assert.rejects(services.dispatch('موضوع'), { code: 'DISPATCH_UNCERTAIN', uncertain: true });
});

test('HTTP and network mutation failures preserve uncertainty without leaking provider bodies', async () => {
  const unavailable = fixture({ fetch: async () => response({ secret: 'never-read' }, 503) });
  await assert.rejects(unavailable.services.dispatch('موضوع'), { code: 'GITHUB_HTTP', uncertain: true });
  const unauthorized = fixture({ fetch: async () => response(null, 403) });
  await assert.rejects(unauthorized.services.dispatch('موضوع'), { code: 'GITHUB_HTTP', uncertain: false });
  const disconnected = fixture({ fetch: async () => { throw new Error('private transport details'); } });
  await assert.rejects(disconnected.services.merge(12, 'a'.repeat(40)), { code: 'GITHUB_NETWORK', uncertain: true });
});

test('merge includes SHA and never reports merged:false as success', async () => {
  const { services } = fixture({ fetch: async (_url, options) => {
    assert.deepEqual(JSON.parse(options.body), { merge_method: 'squash', sha: 'a'.repeat(40) });
    return response({ merged: false });
  } });
  await assert.rejects(services.merge(12, 'a'.repeat(40)), { code: 'MERGE_NOT_CONFIRMED' });
});

test('closing the PR is successful even if branch deletion is unavailable', async () => {
  const methods = [];
  const { services } = fixture({ fetch: async (_url, options) => {
    methods.push(options.method);
    return options.method === 'PATCH' ? response({ state: 'closed' }) : response(null, 403);
  } });
  await services.reject(12, 'article/example');
  assert.deepEqual(methods, ['PATCH', 'DELETE']);
});

test('workflow and PR validation reject unrelated resources and exact run marker mismatches', async (t) => {
  const h = makeHarness(t);
  const badRun = fixture({ fetch: async () => response({ ...h.state.run, path: '.github/workflows/other.yml' }) });
  await assert.rejects(badRun.services.getRun(101), { code: 'INVALID_RUN' });
  const badPull = fixture({ fetch: async () => response({ ...h.state.pull, base: { ref: 'another-branch' } }) });
  await assert.rejects(badPull.services.getPull(12), { code: 'INVALID_PR' });
  const wrongMarker = fixture({ fetch: async () => response([{ ...h.state.pull, body: '- Workflow run: 1010' }]) });
  assert.equal(await wrongMarker.services.findPull(101), null);
});

test('full offline flow crosses the SDK boundary, actual SQLite schema and provider adapters', async (t) => {
  const h = makeHarness(t);
  const calls = [];
  const services = createIntegrations({
    api: h.api, config: h.config, FormData: OfflineFormData, InputFile: OfflineInputFile,
    resolveCredential: async () => 'offline-credential-placeholder',
    fetch: async (url, options = {}) => {
      calls.push({ url, method: options.method ?? 'GET' });
      if (url.endsWith('/dispatches')) return response({ workflow_run_id: 101, html_url: h.state.run.html_url });
      if (url.endsWith('/actions/runs/101')) return response({ ...h.state.run, status: 'completed', conclusion: 'success' });
      if (url.includes('/pulls?')) return response([structuredClone(h.state.pull)]);
      if (url.endsWith('/pulls/12')) return response(structuredClone(h.state.pull));
      if (url.endsWith('/pulls/12/merge')) {
        assert.equal(JSON.parse(options.body).sha, h.state.pull.head.sha);
        return response({ merged: true });
      }
      throw new Error('Unexpected outbound request');
    },
  });
  const bot = h.build(services);
  await bot.message({ from: { id: 7 }, chat: { id: 7 }, message_id: 1, text: 'موضوع' }, { update: { update_id: 1 } });
  const callback = (data) => ({ id: 'fixture', from: { id: 7 }, message: { chat: { id: 7 } }, data });
  await bot.callback(callback('article:confirm:u1'));
  await bot.callback(callback('status:check:u1'));
  await bot.callback(callback(`review:approve:u1:${'a'.repeat(12)}`));
  assert.equal((await h.store.get('u1')).status, 'merged');
  assert.equal(calls.filter((call) => call.method === 'POST').length, 1);
  assert.equal(calls.filter((call) => call.method === 'PUT').length, 1);
});
