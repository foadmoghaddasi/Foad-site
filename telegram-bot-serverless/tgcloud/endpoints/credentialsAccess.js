import { EndpointError } from 'sdk';
import { config } from '../lib/config.js';
import { createCredentialsEndpoints } from '../lib/credentials-endpoints.js';

export default async function (input, ctx) {
  return createCredentialsEndpoints({ config, EndpointError }).access(input, ctx);
}
