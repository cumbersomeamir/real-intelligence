/**
 * @file Revenue route definitions.
 */

import { Router } from 'express';
import {
  revenueOverview,
  commissionTracking,
  subscriptionMetrics,
  leadCost
} from '../controllers/revenueController.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';
import { asyncHandler } from '../utils/helpers.js';

const router = Router();

router.use(authenticate, authorize('admin'));
router.get('/overview', asyncHandler(revenueOverview));
router.get('/commissions', asyncHandler(commissionTracking));
router.get('/subscriptions', asyncHandler(subscriptionMetrics));
router.get('/lead-cost', asyncHandler(leadCost));

export default router;
