/**
 * @file Scraper route definitions.
 */

import { Router } from 'express';
import {
  scraperStatus,
  triggerScrape,
  crawlHistory,
  dataQuality
} from '../controllers/scraperController.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';
import { asyncHandler } from '../utils/helpers.js';

const router = Router();

router.use(authenticate, authorize('admin'));
router.get('/status', asyncHandler(scraperStatus));
router.post('/trigger/:source', asyncHandler(triggerScrape));
router.get('/history', asyncHandler(crawlHistory));
router.get('/quality', asyncHandler(dataQuality));

export default router;
