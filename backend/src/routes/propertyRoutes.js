/**
 * @file Property route definitions.
 */

import { Router } from 'express';
import {
  listProperties,
  getProperty,
  searchProperties,
  mapProperties,
  heatmapProperties,
  similarProperties,
  propertyHistory
} from '../controllers/propertyController.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../utils/helpers.js';

const router = Router();

router.get('/', authenticate, asyncHandler(listProperties));
router.get('/search', authenticate, asyncHandler(searchProperties));
router.get('/map', authenticate, asyncHandler(mapProperties));
router.get('/heatmap', authenticate, asyncHandler(heatmapProperties));
router.get('/:id/similar', authenticate, asyncHandler(similarProperties));
router.get('/:id/history', authenticate, asyncHandler(propertyHistory));
router.get('/:id', authenticate, asyncHandler(getProperty));

export default router;
