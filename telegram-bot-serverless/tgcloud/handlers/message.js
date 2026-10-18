import { createRuntime } from '../lib/runtime.js';

export default async function (message, ctx) {
  return createRuntime().message(message, ctx);
}
