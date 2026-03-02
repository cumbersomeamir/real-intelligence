/**
 * @file Micro-location route definitions.
 */

import { Router } from 'express';
import {
  listMicroLocations,
  getMicroLocation,
  locationTrends,
  locationProperties
} from '../controllers/microLocationController.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../utils/helpers.js';

const router = Router();

router.get('/', asyncHandler(listMicroLocations));
router.get('/:slug', asyncHandler(getMicroLocation));
router.get('/:slug/trends', authenticate, asyncHandler(locationTrends));
router.get('/:slug/properties', authenticate, asyncHandler(locationProperties));

export default router;
