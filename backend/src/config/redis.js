/**
 * @file Redis client configuration.
 */

import IORedis from 'ioredis';
import { env } from './env.js';

/** Shared Redis connection. */
export const redis = new IORedis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  retryStrategy: () => null
});

// Prevent noisy unhandled error logs in local development when Redis is absent.
redis.on('error', () => null);
