import { db, EndpointError } from 'sdk';
import { config } from '../lib/config.js';
import { createCredentialsEndpoints } from '../lib/credentials-endpoints.js';

export default async function (input, ctx) {
  return createCredentialsEndpoints({ db, config, EndpointError }).save(input, ctx);
}
