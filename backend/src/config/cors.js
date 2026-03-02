/**
 * @file CORS options for Express.
 */

import { env } from './env.js';

/** CORS options object. */
export const corsOptions = {
  origin: [env.FRONTEND_URL],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']
};
