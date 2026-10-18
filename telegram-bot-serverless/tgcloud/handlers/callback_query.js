import { createRuntime } from '../lib/runtime.js';

export default async function (callback) {
  return createRuntime().callback(callback);
}
