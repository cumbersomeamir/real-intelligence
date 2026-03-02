/**
 * @file Redis-backed rate limiter middleware.
 */

import { redis } from '../config/redis.js';

/**
 * Creates a rate limiter middleware.
 * @param {Object} options - Limiter options.
 * @param {number} options.limit - Max requests.
 * @param {number} options.windowSec - Window seconds.
 * @returns {import('express').RequestHandler} Middleware.
 */
export function createRateLimiter({ limit, windowSec }) {
  return async (req, res, next) => {
    try {
      // Fail-open when Redis is unavailable so local development can continue.
      if (!redis || redis.status === 'end' || redis.status === 'reconnecting') {
        return next();
      }

      const timeout = new Promise((resolve) => setTimeout(() => resolve(null), 150));
      const key = `ratelimit:${req.ip}:${req.baseUrl}`;
      const count = await Promise.race([redis.incr(key), timeout]);
      if (count === null) return next();
      if (count === 1) await redis.expire(key, windowSec);

      if (count > limit) {
        return res.status(429).json({ message: 'Too many requests.' });
      }

      return next();
    } catch {
      return next();
    }
  };
}

export const publicLimiter = createRateLimiter({ limit: 100, windowSec: 60 });
export const authLimiter = createRateLimiter({ limit: 10, windowSec: 60 });
export const webhookLimiter = createRateLimiter({ limit: 1000, windowSec: 60 });
export const adminLimiter = createRateLimiter({ limit: 500, windowSec: 60 });
