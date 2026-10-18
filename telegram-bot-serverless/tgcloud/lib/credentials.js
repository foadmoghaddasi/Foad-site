import { UserError } from './errors.js';

const allowedNames = Object.freeze(['OPENAI_API_KEY', 'GITHUB_TOKEN']);
const labels = Object.freeze({ OPENAI_API_KEY: 'OpenAI API Key', GITHUB_TOKEN: 'GitHub Token' });
const inputNames = Object.freeze({ openaiApiKey: 'OPENAI_API_KEY', githubToken: 'GITHUB_TOKEN' });

function validateValue(value) {
  if (typeof value !== 'string' || value.length > 4096 || !/^[\x21-\x7e]+$/.test(value)) {
    throw new UserError('فرمت کلید معتبر نیست؛ فاصله، خط جدید یا مقدار بیش از حد طولانی مجاز نیست.', 'INVALID_CREDENTIAL_VALUE');
  }
  return value;
}

// db is the official SDK database, injected by runtime/endpoints. No read API
// is exposed to the Mini App; only integrations may resolve a credential.
export function createCredentialStore(db, { now = () => Date.now() } = {}) {
  return {
    async resolve(name) {
      if (!allowedNames.includes(name)) throw new UserError('نوع کلید مجاز نیست.', 'INVALID_CREDENTIAL_NAME');
      let row;
      try {
        row = await db.get('SELECT value FROM bot_credentials WHERE name = :name', { ':name': name });
      } catch {
        throw new UserError('جدول کلیدها در دسترس نیست؛ migration دیتابیس را بررسی کنید.', 'CREDENTIAL_STORE_UNAVAILABLE');
      }
      if (!row || typeof row.value !== 'string' || !row.value) {
        throw new UserError(`کلید ${labels[name]} ذخیره نشده است؛ صفحهٔ تنظیمات بات را باز کنید.`, 'CREDENTIAL_MISSING');
      }
      try { return validateValue(row.value); } catch {
        throw new UserError(`کلید ${labels[name]} معتبر نیست؛ آن را از صفحهٔ تنظیمات تعویض کنید.`, 'CREDENTIAL_INVALID');
      }
    },
    async save(input, userId) {
      if (!input || typeof input !== 'object' || Array.isArray(input)
        || Object.keys(input).some((key) => !Object.hasOwn(inputNames, key))) {
        throw new UserError('ورودی ذخیره‌سازی معتبر نیست.', 'INVALID_CREDENTIAL_INPUT');
      }
      const updates = [];
      for (const [field, name] of Object.entries(inputNames)) {
        if (!Object.hasOwn(input, field)) continue;
        const value = input[field];
        if (value === '') continue; // Empty fields preserve existing values.
        updates.push({ name, value: validateValue(value) });
      }
      if (!updates.length) throw new UserError('حداقل یک کلید جدید وارد کنید.', 'EMPTY_CREDENTIAL_INPUT');
      const params = { ':updatedAt': now(), ':updatedBy': String(userId) };
      updates.forEach(({ name, value }, i) => {
        params[`:name${i}`] = name; params[`:value${i}`] = value;
      });
      try {
        // One statement: both replacements succeed together or neither changes.
        await db.run(
          `INSERT INTO bot_credentials (name, value, updatedAt, updatedBy)
           VALUES ${updates.map((_, i) => `(:name${i}, :value${i}, :updatedAt, :updatedBy)`).join(', ')}
           ON CONFLICT(name) DO UPDATE SET value = excluded.value,
             updatedAt = excluded.updatedAt, updatedBy = excluded.updatedBy`,
          params,
        );
      } catch {
        // Do not propagate SQL, bound parameters, provider errors, or causes.
        throw new UserError('ذخیرهٔ کلیدها انجام نشد؛ وضعیت جدول و migration را بررسی کنید.', 'CREDENTIAL_SAVE_FAILED');
      }
      return { saved: true };
    },
  };
}
