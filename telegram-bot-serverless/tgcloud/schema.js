import { table, text, integer, index, check, sql } from 'sdk/db';

// Article data stays separate from the owner-managed credentials table.
export const articleRequests = table('article_requests', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  chatId: integer('chatId').notNull(),
  topic: text('topic').notNull().default(''),
  status: text('status').notNull(),
  createdAt: integer('createdAt').notNull(),
  updatedAt: integer('updatedAt').notNull(),
  expiresAt: integer('expiresAt').notNull(),
  confirmedAt: integer('confirmedAt'),
  reviewedAt: integer('reviewedAt'),
  reviewDecision: text('reviewDecision'),
  workflowRunId: integer('workflowRunId').unique(),
  workflowUrl: text('workflowUrl'),
  prNumber: integer('prNumber'),
  prUrl: text('prUrl'),
  branch: text('branch'),
  headSha: text('headSha'),
  faTitle: text('faTitle'),
  enTitle: text('enTitle'),
  slug: text('slug'),
  lastError: text('lastError'),
}, (t) => ({
  ownerHistory: index('article_requests_owner_history').on(t.userId, t.chatId, t.createdAt),
}));

// Values are supplied through the authenticated Mini App, never through source.
export const botCredentials = table('bot_credentials', {
  name: text('name').primaryKey().notNull(),
  value: text('value').notNull(),
  updatedAt: integer('updatedAt').notNull(),
  updatedBy: text('updatedBy').notNull(),
}, (t) => ({
  allowedNames: check('bot_credentials_allowed_names', sql`${t.name} IN ('OPENAI_API_KEY', 'GITHUB_TOKEN')`),
  nonEmptyValue: check('bot_credentials_value_length', sql`length(${t.value}) BETWEEN 1 AND 4096`),
}));
