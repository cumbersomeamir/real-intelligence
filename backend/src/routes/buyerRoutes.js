/**
 * @file Buyer route definitions.
 */

import { Router } from 'express';
import {
  listBuyers,
  createBuyer,
  getBuyer,
  updateBuyer,
  demandMap,
  pipelineStats
} from '../controllers/buyerController.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';
import { asyncHandler } from '../utils/helpers.js';

const router = Router();

router.get('/', authenticate, authorize('admin'), asyncHandler(listBuyers));
router.post('/', asyncHandler(createBuyer));
router.get('/demand-map', authenticate, authorize('admin'), asyncHandler(demandMap));
router.get('/pipeline', authenticate, authorize('admin'), asyncHandler(pipelineStats));
router.get('/:id', authenticate, authorize('admin'), asyncHandler(getBuyer));
router.patch('/:id', authenticate, authorize('admin'), asyncHandler(updateBuyer));

export default router;
