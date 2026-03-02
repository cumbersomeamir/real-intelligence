/**
 * @file WhatsApp route definitions.
 */

import { Router } from 'express';
import {
  listTemplates,
  sendMessage,
  broadcastMessage,
  whatsappStats
} from '../controllers/whatsappController.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';
import { asyncHandler } from '../utils/helpers.js';

const router = Router();

router.use(authenticate, authorize('admin'));
router.get('/templates', asyncHandler(listTemplates));
router.post('/send', asyncHandler(sendMessage));
router.post('/broadcast', asyncHandler(broadcastMessage));
router.get('/stats', asyncHandler(whatsappStats));

export default router;
