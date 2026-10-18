import { createCredentialStore } from './credentials.js';
import { UserError } from './errors.js';

export function createCredentialsEndpoints({ db, config, EndpointError, now }) {
  function owner(ctx) {
    // The platform verifies the signature before constructing ctx.initData.
    // Never accept input.initData, input.userId, headers, or client-side claims.
    const userId = ctx?.initData?.user?.id;
    if (!Number.isSafeInteger(userId) || userId <= 0) {
      throw new EndpointError('احراز هویت تلگرام لازم است؛ صفحه را داخل بات باز کنید.', { code: 'UNAUTHORIZED' });
    }
    if (!/^\d+$/.test(String(config.allowedUserId)) || String(userId) !== String(config.allowedUserId)) {
      throw new EndpointError('دسترسی به تنظیمات مجاز نیست.', { code: 'FORBIDDEN' });
    }
    return userId;
  }
  return {
    access(_input, ctx) {
      owner(ctx);
      return { authorized: true };
    },
    async save(input, ctx) {
      const userId = owner(ctx); // Authorize before inspecting input or touching DB.
      try {
        await createCredentialStore(db, { now }).save(input, userId);
        return { saved: true };
      } catch (error) {
        throw new EndpointError(
          error instanceof UserError ? error.message : 'ذخیرهٔ کلیدها انجام نشد.',
          { code: error instanceof UserError ? error.code : 'CREDENTIAL_SAVE_FAILED' },
        );
      }
    },
  };
}
