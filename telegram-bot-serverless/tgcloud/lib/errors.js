export class UserError extends Error {
  constructor(message, code = 'INVALID_REQUEST', uncertain = false) {
    super(message);
    this.name = 'UserError';
    this.code = code;
    this.uncertain = uncertain;
  }
}

// Never expose provider response bodies, headers, or arbitrary exception text.
export function publicError(error) {
  return error instanceof UserError
    ? error.message
    : 'عملیات کامل نشد. وضعیت درخواست را دوباره بررسی کنید.';
}
