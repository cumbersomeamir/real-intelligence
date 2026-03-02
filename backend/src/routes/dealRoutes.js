/**
 * @file Deal route definitions.
 */

import { Router } from 'express';
import {
  listDeals,
  topDeals,
  getDeal,
  updateDealStatus,
  matchDeal
} from '../controllers/dealController.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';
import { asyncHandler } from '../utils/helpers.js';

const router = Router();

router.get('/', authenticate, asyncHandler(listDeals));
router.get('/top', authenticate, asyncHandler(topDeals));
router.get('/:id', authenticate, asyncHandler(getDeal));
router.patch('/:id/status', authenticate, authorize('admin'), asyncHandler(updateDealStatus));
router.post('/:id/match', authenticate, authorize('admin'), asyncHandler(matchDeal));

export default router;
