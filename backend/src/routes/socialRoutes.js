/**
 * @file Social route definitions.
 */

import { Router } from 'express';
import { socialOverview, generateSocialContent } from '../controllers/socialController.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';
import { asyncHandler } from '../utils/helpers.js';

const router = Router();

router.use(authenticate, authorize('admin'));
router.get('/overview', asyncHandler(socialOverview));
router.post('/generate', asyncHandler(generateSocialContent));

export default router;
