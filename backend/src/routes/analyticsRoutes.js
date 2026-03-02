/**
 * @file Analytics route definitions.
 */

import { Router } from 'express';
import {
  marketOverview,
  trendData,
  supplyDemand,
  forecasts,
  aiQuery
} from '../controllers/analyticsController.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';
import { asyncHandler } from '../utils/helpers.js';

const router = Router();

router.get('/market', authenticate, asyncHandler(marketOverview));
router.get('/trends', authenticate, asyncHandler(trendData));
router.get('/supply-demand', authenticate, authorize('admin'), asyncHandler(supplyDemand));
router.get('/forecasts', authenticate, authorize('admin'), asyncHandler(forecasts));
router.post('/ai-query', authenticate, asyncHandler(aiQuery));

export default router;
