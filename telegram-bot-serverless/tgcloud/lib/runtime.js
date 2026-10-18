import { api, db, fetch, FormData, InputFile } from 'sdk';
import { config } from './config.js';
import { createCredentialStore } from './credentials.js';
import { createIntegrations } from './integrations.js';
import { createStore } from './store.js';
import { createArticleBot } from './article-bot.js';

export function createRuntime() {
  return createArticleBot({
    api, config, store: createStore(db),
    services: createIntegrations({ api, fetch, FormData, InputFile, config, resolveCredential: createCredentialStore(db).resolve }),
  });
}
