/**
 * @file Role-based access control middleware.
 */

import { AuditLog } from '../models/AuditLog.js';

/**
 * Restricts route access to selected roles.
 * @param {...string} roles - Allowed roles.
 * @returns {import('express').RequestHandler} Middleware handler.
 */
export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden.' });
    }

    if (req.user.role === 'admin') {
      AuditLog.create({
        userId: req.user.sub,
        action: `${req.method} ${req.originalUrl}`,
        entity: 'api',
        entityId: req.params.id || req.params.slug || '',
        ip: req.ip,
        details: { query: req.query, bodyKeys: Object.keys(req.body || {}) }
      }).catch(() => null);
    }
    return next();
  };
}
