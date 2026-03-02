/**
 * @file Authentication business logic.
 */

import { User } from '../../models/User.js';
import { hashValue, compareValue } from '../../utils/crypto.js';
import { createAccessToken, createRefreshToken } from './tokenService.js';

/**
 * Registers a new user.
 * @param {Object} payload - Registration payload.
 * @returns {Promise<Object>} Auth response.
 */
export async function register(payload) {
  const existing = await User.findOne({ $or: [{ email: payload.email }, { phone: payload.phone }] });
  if (existing) throw new Error('User already exists.');

  const passwordHash = await hashValue(payload.password);
  const user = await User.create({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    role: payload.role || 'investor',
    passwordHash,
    isVerified: true
  });

  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);
  return { user, accessToken, refreshToken };
}

/**
 * Logs in an existing user.
 * @param {Object} payload - Login payload.
 * @returns {Promise<Object>} Auth response.
 */
export async function login(payload) {
  const user = await User.findOne({
    $or: [{ email: payload.identifier }, { phone: payload.identifier }]
  });
  if (!user) throw new Error('Invalid credentials.');

  const valid = await compareValue(payload.password, user.passwordHash || '');
  if (!valid) throw new Error('Invalid credentials.');

  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);
  return { user, accessToken, refreshToken };
}
