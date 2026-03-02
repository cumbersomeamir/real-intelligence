/**
 * @file Auth controller.
 */

import { register, login } from '../services/auth/authService.js';
import { createAccessToken, verifyRefreshToken } from '../services/auth/tokenService.js';
import { User } from '../models/User.js';
import { issueOtp } from '../services/auth/otpService.js';

/**
 * Registers a new user.
 */
export async function registerUser(req, res) {
  const data = await register(req.body);
  res.status(201).json(data);
}

/**
 * Logs in user.
 */
export async function loginUser(req, res) {
  const data = await login(req.body);
  res.json(data);
}

/**
 * Refreshes access token.
 */
export async function refreshToken(req, res) {
  const { refreshToken: token } = req.body;
  const decoded = verifyRefreshToken(token);
  const user = await User.findById(decoded.sub);
  if (!user) return res.status(401).json({ message: 'User not found.' });

  return res.json({ accessToken: createAccessToken(user) });
}

/**
 * Returns current user profile.
 */
export async function currentUser(req, res) {
  const user = await User.findById(req.user.sub).select('-passwordHash');
  if (!user) return res.status(404).json({ message: 'User not found.' });
  return res.json(user);
}

/**
 * Triggers forgot password OTP flow.
 */
export async function forgotPassword(req, res) {
  const { identifier } = req.body;
  const otp = issueOtp(identifier);
  return res.json({ message: 'Reset OTP issued.', otpPreview: otp.otp });
}
