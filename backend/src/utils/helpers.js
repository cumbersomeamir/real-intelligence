/**
 * @file Utility helper functions.
 */

/**
 * Wraps async route handlers for centralized error forwarding.
 * @param {Function} handler - Async route handler.
 * @returns {Function} Wrapped handler.
 */
export function asyncHandler(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

/**
 * Safely parses integer input.
 * @param {any} value - Input value.
 * @param {number} fallback - Fallback number.
 * @returns {number} Parsed integer.
 */
export function toInt(value, fallback = 0) {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}
