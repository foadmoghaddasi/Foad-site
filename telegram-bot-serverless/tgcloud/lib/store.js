const fields = new Set([
  'userId', 'chatId', 'topic', 'status', 'createdAt', 'updatedAt', 'expiresAt',
  'confirmedAt', 'reviewedAt', 'reviewDecision',
  'workflowRunId', 'workflowUrl', 'prNumber', 'prUrl', 'branch', 'headSha',
  'faTitle', 'enTitle', 'slug', 'lastError',
]);

export function createStore(db) {
  return {
    async insert(request) {
      const keys = ['id', ...Object.keys(request).filter((key) => fields.has(key))];
      const result = await db.run(
        `INSERT INTO article_requests (${keys.map((key) => `"${key}"`).join(', ')})
         VALUES (${keys.map((key) => `:${key}`).join(', ')}) ON CONFLICT(id) DO NOTHING`,
        Object.fromEntries(keys.map((key) => [`:${key}`, request[key]])),
      );
      return result.rowsAffected === 1;
    },
    get(id) {
      return db.get('SELECT * FROM article_requests WHERE id = :id', { ':id': id });
    },
    latest(userId, chatId) {
      return db.get(
        'SELECT * FROM article_requests WHERE userId = :userId AND chatId = :chatId ORDER BY createdAt DESC, id DESC LIMIT 1',
        { ':userId': String(userId), ':chatId': chatId },
      );
    },
    async transition(id, expectedStatuses, patch, notExpiredAt) {
      const keys = Object.keys(patch);
      if (!keys.length || keys.some((key) => !fields.has(key))) throw new Error('Invalid request patch');
      const statuses = Array.isArray(expectedStatuses) ? expectedStatuses : [expectedStatuses];
      const params = { ':id': id };
      keys.forEach((key) => { params[`:${key}`] = patch[key]; });
      statuses.forEach((status, i) => { params[`:expected${i}`] = status; });
      if (notExpiredAt != null) params[':notExpiredAt'] = notExpiredAt;
      const result = await db.run(
        `UPDATE article_requests SET ${keys.map((key) => `"${key}" = :${key}`).join(', ')}
         WHERE id = :id AND status IN (${statuses.map((_, i) => `:expected${i}`).join(', ')})
         ${notExpiredAt == null ? '' : 'AND expiresAt > :notExpiredAt'}`,
        params,
      );
      return result.rowsAffected === 1;
    },
  };
}
