/**
 * @file API response cache middleware.
 */

import { redis } from '../config/redis.js';

/**
 * Caches JSON responses for a fixed TTL.
 * @param {number} ttlSeconds - Time-to-live in seconds.
 * @returns {import('express').RequestHandler} Cache middleware.
 */
export function responseCache(ttlSeconds = 60) {
  return async (req, res, next) => {
    const key = `cache:${req.originalUrl}`;

    try {
      const cached = await redis.get(key);
      if (cached) return res.json(JSON.parse(cached));

      const originalJson = res.json.bind(res);
      res.json = (payload) => {
        redis.set(key, JSON.stringify(payload), 'EX', ttlSeconds).catch(() => null);
        return originalJson(payload);
      };
      return next();
    } catch {
      return next();
    }
  };
}
