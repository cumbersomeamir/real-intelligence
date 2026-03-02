/**
 * @file Auth route definitions.
 */

import { Router } from 'express';
import {
  registerUser,
  loginUser,
  refreshToken,
  currentUser,
  forgotPassword
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { asyncHandler } from '../utils/helpers.js';

const router = Router();

router.post('/register', authLimiter, asyncHandler(registerUser));
router.post('/login', authLimiter, asyncHandler(loginUser));
router.post('/refresh', authenticate, asyncHandler(refreshToken));
router.get('/me', authenticate, asyncHandler(currentUser));
router.post('/forgot-password', authLimiter, asyncHandler(forgotPassword));

export default router;
