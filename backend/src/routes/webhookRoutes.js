/**
 * @file Webhook route definitions.
 */

import { Router } from 'express';
import {
  whatsappWebhook,
  razorpayWebhook,
  instagramWebhook
} from '../controllers/webhookController.js';
import { webhookLimiter } from '../middleware/rateLimiter.js';
import { asyncHandler } from '../utils/helpers.js';

const router = Router();

router.post('/whatsapp', webhookLimiter, asyncHandler(whatsappWebhook));
router.post('/razorpay', webhookLimiter, asyncHandler(razorpayWebhook));
router.post('/instagram', webhookLimiter, asyncHandler(instagramWebhook));

export default router;
