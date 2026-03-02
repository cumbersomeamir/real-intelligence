/**
 * @file Report route definitions.
 */

import { Router } from 'express';
import {
  listReports,
  getReport,
  purchaseReport,
  downloadReport
} from '../controllers/reportController.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../utils/helpers.js';

const router = Router();

router.get('/', authenticate, asyncHandler(listReports));
router.get('/:id', authenticate, asyncHandler(getReport));
router.post('/:id/purchase', authenticate, asyncHandler(purchaseReport));
router.get('/:id/download', authenticate, asyncHandler(downloadReport));

export default router;
