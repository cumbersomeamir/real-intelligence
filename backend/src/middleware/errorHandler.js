/**
 * @file Global error handler middleware.
 */

import { logger } from '../config/logger.js';

/**
 * Handles uncaught errors and sends normalized response.
 * @param {Error} err - Error object.
 * @param {import('express').Request} req - Request.
 * @param {import('express').Response} res - Response.
 * @param {import('express').NextFunction} _next - Next callback.
 */
export function errorHandler(err, req, res, _next) {
  logger.error({ message: err.message, stack: err.stack, path: req.originalUrl });
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || 'Internal server error.' });
}
