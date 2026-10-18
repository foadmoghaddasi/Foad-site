// Non-secret settings copied from the existing bot. Never put API keys here.
export const config = Object.freeze({
  allowedUserId: '457041706',
  githubOwner: 'foadmoghaddasi',
  githubRepo: 'foad-site',
  githubRef: 'main',
  workflowFile: 'generate-bilingual-article.yml',
  githubApiVersion: '2026-03-10',
  transcriptionModel: 'gpt-transcribe',
  confirmationTtlMs: 15 * 60_000,
  maxTopicLength: 2500,
  maxVoiceBytes: 20 * 1024 * 1024,
});
