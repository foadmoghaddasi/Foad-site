import test from 'node:test';
import assert from 'node:assert/strict';
import { makeHarness } from './helpers.mjs';
import { UserError } from '../tgcloud/lib/errors.js';
import { createCredentialStore } from '../tgcloud/lib/credentials.js';

test('start/ping work for the configured owner; missing settings and other users fail closed', async (t) => {
  const h = makeHarness(t);
  await h.message('/start'); await h.message('/ping');
  assert.match(h.sent[0].text, /موضوع مقاله/);
  assert.equal(h.sent[1].text, 'بات فعاله ✅');
  await h.message('private', { userId: 8 });
  assert.equal(h.sent.length, 2);
  const unconfigured = makeHarness(t, { config: { allowedUserId: '' } });
  await unconfigured.message('/ping');
  assert.equal(unconfigured.sent.length, 0);
});

test('text confirmation survives new invocations; replay does not duplicate a request', async (t) => {
  const h = makeHarness(t);
  await h.message('  طراحی\n  محصول ');
  h.restart();
  await h.message('  طراحی\n  محصول ');
  assert.equal((await h.store.get('u1')).topic, 'طراحی محصول');
  assert.equal(h.sqlite.prepare('SELECT count(*) AS n FROM article_requests').get().n, 1);
  await h.message('/status u1', { id: 2 });
  assert.match(h.sent.at(-1).text, /آیا مقاله ساخته شود/);
});

test('voice is transcribed once and goes through the same confirmation path', async (t) => {
  const h = makeHarness(t);
  const voice = { file_id: 'fixture', duration: 10, file_size: 3 };
  await h.message(undefined, { voice });
  await h.message(undefined, { voice });
  assert.equal(h.state.transcriptions, 1);
  assert.equal((await h.store.get('u1')).topic, 'موضوع ویس');
  assert.equal((await h.store.get('u1')).status, 'confirming');
});

test('cancellation and expiration cannot dispatch workflows', async (t) => {
  const h = makeHarness(t);
  await h.message('موضوع'); await h.callback('article:cancel:u1'); await h.callback('article:confirm:u1');
  assert.equal((await h.store.get('u1')).status, 'cancelled');
  await h.message('موضوع دیگر', { id: 2 });
  h.state.timestamp += h.config.confirmationTtlMs;
  await h.callback('article:confirm:u2');
  assert.equal((await h.store.get('u2')).status, 'expired');
  assert.equal(h.state.dispatches, 0);
});

test('concurrent confirmation dispatches once, with a durable exact workflow ID', async (t) => {
  const h = makeHarness(t);
  await h.message('موضوع');
  await Promise.all([h.callback('article:confirm:u1'), h.callback('article:confirm:u1')]);
  assert.equal(h.state.dispatches, 1);
  const request = await h.store.get('u1');
  assert.equal(request.workflowRunId, 101);
  assert.equal(request.status, 'watching');
  assert.ok(request.confirmedAt);
});

test('topic callbacks are bound to both the owner and the originating chat', async (t) => {
  const h = makeHarness(t);
  await h.message('موضوع');
  await h.callback('article:confirm:u1', { userId: 8 });
  await h.callback('article:confirm:u1', { chatId: 99 });
  assert.equal(h.state.dispatches, 0);
  assert.equal((await h.store.get('u1')).status, 'confirming');
});

test('status checks are on demand; workflow success yields the PR review keyboard', async (t) => {
  const h = makeHarness(t);
  await h.readyForReview();
  assert.equal((await h.store.get('u1')).status, 'awaiting_review');
  assert.match(h.sent.at(-1).text, /pull\/12/);
  for (const row of h.sent.at(-1).reply_markup.inline_keyboard) {
    for (const button of row) assert.ok(Buffer.byteLength(button.callback_data) <= 64);
  }
});

test('failed workflow and absent PR are handled without falsely reporting success', async (t) => {
  const h = makeHarness(t);
  await h.message('موضوع'); await h.callback('article:confirm:u1');
  h.state.run.status = 'completed'; h.state.run.conclusion = 'failure';
  await h.callback('status:check:u1');
  assert.equal((await h.store.get('u1')).status, 'failed');
  const noPr = makeHarness(t, { services: { async findPull() { return null; } } });
  await noPr.readyForReview();
  assert.equal((await noPr.store.get('u1')).status, 'watching');
  assert.match(noPr.sent.at(-1).text, /هنوز پیدا نشده/);
});

test('approval merges the reviewed SHA once and records the decision', async (t) => {
  const h = makeHarness(t);
  await h.readyForReview();
  await Promise.all([h.review(), h.review()]);
  assert.equal(h.state.merges, 1);
  assert.equal(h.state.mergeSha, 'a'.repeat(40));
  assert.equal((await h.store.get('u1')).status, 'merged');
  assert.equal((await h.store.get('u1')).reviewDecision, 'approve');
  assert.ok((await h.store.get('u1')).reviewedAt);
  assert.match(h.sent.at(-1).text, /جداگانه/);
});

test('rejection closes a PR without merging it', async (t) => {
  const h = makeHarness(t);
  await h.readyForReview(); await h.review('reject');
  assert.equal(h.state.rejects, 1);
  assert.equal(h.state.merges, 0);
  assert.equal((await h.store.get('u1')).status, 'rejected');
});

test('changed PR content requires fresh consent, including after a status refresh', async (t) => {
  const h = makeHarness(t);
  await h.readyForReview();
  const oldSha = h.state.pull.head.sha;
  h.state.pull.head.sha = 'b'.repeat(40);
  await h.review('approve', oldSha);
  assert.equal(h.state.merges, 0);
  assert.equal((await h.store.get('u1')).headSha, 'b'.repeat(40));
  await h.review('approve', oldSha);
  assert.equal(h.state.merges, 0);
  await h.review();
  assert.equal(h.state.merges, 1);
});

test('mergeability null and mismatched run markers cannot publish', async (t) => {
  const h = makeHarness(t);
  await h.readyForReview(); h.state.pull.mergeable = null;
  await h.review();
  assert.equal(h.state.merges, 0);
  h.state.pull.mergeable = true;
  h.state.pull.body = '- Workflow run: 1010';
  await h.review();
  assert.equal(h.state.merges, 0);
});

test('ambiguous dispatch never auto-retries; the owner can attach a verified run', async (t) => {
  const h = makeHarness(t, { services: { async dispatch() { throw new UserError('نامشخص', 'GITHUB_NETWORK', true); } } });
  await h.message('موضوع'); await h.callback('article:confirm:u1');
  assert.equal((await h.store.get('u1')).status, 'dispatch_uncertain');
  await h.callback('article:confirm:u1');
  assert.equal((await h.store.get('u1')).status, 'dispatch_uncertain');
  await h.message('/attach u1 101', { id: 2 });
  assert.equal((await h.store.get('u1')).status, 'watching');
});

test('an uncertain merge is reconciled through a later read rather than repeated', async (t) => {
  const h = makeHarness(t, { services: { async merge() { throw new UserError('نامشخص', 'GITHUB_NETWORK', true); } } });
  await h.readyForReview(); await h.review();
  assert.equal((await h.store.get('u1')).status, 'merging');
  h.state.pull.merged = true; h.state.pull.state = 'closed';
  await h.callback('status:check:u1');
  assert.equal((await h.store.get('u1')).status, 'merged');
});

test('missing database credentials preserve confirmation and never dispatch', async (t) => {
  const h = makeHarness(t);
  h.services.ensureGithubReady = async () => { await createCredentialStore(h.db).resolve('GITHUB_TOKEN'); };
  await h.message('موضوع'); await h.callback('article:confirm:u1');
  assert.equal(h.state.dispatches, 0);
  assert.equal((await h.store.get('u1')).status, 'confirming');
  assert.match(h.sent.at(-1).text, /GitHub Token ذخیره نشده/);
});

test('unexpected provider errors are sanitized before Telegram or DB storage', async (t) => {
  const sensitive = 'sensitive-provider-response';
  const h = makeHarness(t, { services: { async transcribe() { throw new Error(sensitive); } } });
  await h.message(undefined, { voice: { file_id: 'fixture' } });
  assert.equal((await h.store.get('u1')).status, 'transcription_failed');
  assert.ok(!JSON.stringify(h.sent).includes(sensitive));
  assert.ok(!JSON.stringify(await h.store.get('u1')).includes(sensitive));
});

test('real SQL CAS rejects stale writers, unknown columns, expired claims and duplicate run IDs', async (t) => {
  const h = makeHarness(t);
  await h.message('موضوع');
  const request = await h.store.get('u1');
  await h.store.insert({ ...request, id: 'u2' });
  assert.equal(await h.store.transition('u1', 'confirming', { status: 'watching', workflowRunId: 101 }), true);
  assert.equal(await h.store.transition('u1', 'confirming', { status: 'cancelled' }), false);
  await assert.rejects(h.store.transition('u2', 'confirming', { workflowRunId: 101 }));
  await assert.rejects(h.store.transition('u2', 'confirming', { apiKey: 'not-a-key' }));
  assert.equal(await h.store.transition('u2', 'confirming', { status: 'dispatching' }, request.expiresAt), false);
});
