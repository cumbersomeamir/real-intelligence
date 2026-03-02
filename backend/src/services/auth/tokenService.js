/**
 * @file JWT token helpers.
 */

import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';

/**
 * Creates an access token.
 * @param {Object} user - Auth payload.
 * @returns {string} JWT token.
 */
export function createAccessToken(user) {
  return jwt.sign({ sub: user._id, role: user.role, email: user.email }, env.JWT_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN
  });
}

/**
 * Creates a refresh token.
 * @param {Object} user - Auth payload.
 * @returns {string} Refresh token.
 */
export function createRefreshToken(user) {
  return jwt.sign({ sub: user._id, role: user.role }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN
  });
}

/**
 * Verifies refresh token.
 * @param {string} token - Refresh token.
 * @returns {Object} Decoded payload.
 */
export function verifyRefreshToken(token) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET);
}
