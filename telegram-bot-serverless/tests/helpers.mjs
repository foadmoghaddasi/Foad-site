import { DatabaseSync } from 'node:sqlite';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { createArticleBot } from '../tgcloud/lib/article-bot.js';
import { createStore } from '../tgcloud/lib/store.js';
import { config as defaults } from '../tgcloud/lib/config.js';

// Read the actual schema, exposing only its documented declarative SDK surface.
const definitions = [];
function column(name, type) {
  return {
    name, type, modifiers: [],
    primaryKey() { this.modifiers.push('PRIMARY KEY'); return this; },
    notNull() { this.modifiers.push('NOT NULL'); return this; },
    unique() { this.modifiers.push('UNIQUE'); return this; },
    default(value) { this.modifiers.push(`DEFAULT ${typeof value === 'number' ? value : `'${String(value).replaceAll("'", "''")}'`}`); return this; },
  };
}
const context = vm.createContext({});
const sdk = new vm.SyntheticModule(['table', 'text', 'integer', 'index', 'check', 'sql'], function () {
  this.setExport('table', (name, columns, indexes) => {
    const constraints = Object.values(indexes?.(columns) ?? {}).filter((value) => value?.kind === 'check');
    definitions.push({ name, columns, constraints });
    return columns;
  });
  this.setExport('text', (name) => column(name, 'TEXT'));
  this.setExport('integer', (name) => column(name, 'INTEGER'));
  this.setExport('index', () => ({ on() { return { kind: 'index' }; } }));
  this.setExport('check', (name, expression) => ({ kind: 'check', name, expression }));
  this.setExport('sql', (parts, ...values) => parts.reduce((result, part, i) => {
    const value = values[i];
    return result + part + (i < values.length ? `"${value.name}"` : '');
  }, ''));
}, { context });
const schema = new vm.SourceTextModule(await readFile(new URL('../tgcloud/schema.js', import.meta.url), 'utf8'), { context });
await schema.link((specifier) => {
  if (specifier !== 'sdk/db') throw new Error('Unexpected schema import');
  return sdk;
});
await schema.evaluate();

export function makeHarness(t, overrides = {}) {
  const sqlite = new DatabaseSync(':memory:');
  t.after(() => sqlite.close());
  for (const { name, columns, constraints } of definitions) {
    const entries = Object.values(columns).map((col) => `"${col.name}" ${col.type} ${col.modifiers.join(' ')}`);
    entries.push(...constraints.map((constraint) => `CONSTRAINT "${constraint.name}" CHECK (${constraint.expression})`));
    sqlite.exec(`CREATE TABLE ${name} (${entries.join(', ')})`);
  }
  const db = {
    async run(sql, params = {}) {
      return { rowsAffected: Number(sqlite.prepare(sql).run(params).changes), rows: [] };
    },
    async get(sql, params = {}) { return sqlite.prepare(sql).get(params) ?? null; },
  };
  const store = createStore(db);
  const config = { ...defaults, allowedUserId: '7', githubOwner: 'owner', githubRepo: 'repo', ...overrides.config };
  const state = { timestamp: 1_900_000_000_000, dispatches: 0, merges: 0, rejects: 0, transcriptions: 0 };
  state.run = {
    id: 101, status: 'in_progress', conclusion: null, event: 'workflow_dispatch', head_branch: 'main',
    path: '.github/workflows/generate-bilingual-article.yml', created_at: new Date(state.timestamp).toISOString(),
    html_url: 'https://github.com/owner/repo/actions/runs/101',
  };
  state.pull = {
    number: 12, state: 'open', merged: false, mergeable: true, html_url: 'https://github.com/owner/repo/pull/12',
    head: { ref: 'article/example', sha: 'a'.repeat(40), repo: { full_name: 'owner/repo' } },
    base: { ref: 'main', repo: { full_name: 'owner/repo' } },
    body: '- Persian title: عنوان مقاله\n- English title: Article title\n- Slug: example\n- Workflow run: 101\n',
  };
  const sent = [];
  const answers = [];
  const api = {
    async sendMessage(message) { sent.push(message); return { message_id: sent.length }; },
    async answerCallbackQuery(answer) { answers.push(answer); },
    async getFileContent() { return new Uint8Array([1, 2, 3]); },
  };
  const services = {
    async ensureGithubReady() {},
    async transcribe() { state.transcriptions += 1; return 'موضوع ویس'; },
    async dispatch() { state.dispatches += 1; return { workflowRunId: 101, workflowUrl: state.run.html_url }; },
    async getRun() { return structuredClone(state.run); },
    async findPull() { return structuredClone(state.pull); },
    async getPull() { return structuredClone(state.pull); },
    async merge(number, sha) { state.merges += 1; state.mergeSha = sha; state.pull.merged = true; state.pull.state = 'closed'; },
    async reject() { state.rejects += 1; state.pull.state = 'closed'; },
    ...overrides.services,
  };
  const build = (selectedServices = services) => createArticleBot({ api, store, services: selectedServices, config, now: () => state.timestamp });
  let bot = build();
  return {
    sqlite, db, store, config, state, sent, answers, api, services, build,
    restart() { bot = build(); },
    async message(text, { id = 1, userId = 7, chatId = 7, voice } = {}) {
      return bot.message({ from: { id: userId }, chat: { id: chatId }, message_id: id, ...(voice ? { voice } : { text }) }, { update: { update_id: id } });
    },
    async callback(data, { userId = 7, chatId = 7 } = {}) {
      return bot.callback({ id: `cb-${answers.length}`, from: { id: userId }, message: { chat: { id: chatId } }, data });
    },
    async review(action = 'approve', sha = state.pull.head.sha) {
      return bot.callback({ id: 'review', from: { id: 7 }, message: { chat: { id: 7 } }, data: `review:${action}:u1:${sha.slice(0, 12)}` });
    },
    async readyForReview() {
      await bot.message({ from: { id: 7 }, chat: { id: 7 }, message_id: 1, text: 'موضوع مقاله' }, { update: { update_id: 1 } });
      await bot.callback({ id: 'confirm', from: { id: 7 }, message: { chat: { id: 7 } }, data: 'article:confirm:u1' });
      state.run.status = 'completed'; state.run.conclusion = 'success';
      await bot.callback({ id: 'status', from: { id: 7 }, message: { chat: { id: 7 } }, data: 'status:check:u1' });
    },
  };
}
