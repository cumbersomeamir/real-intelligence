/**
 * @file Blog route definitions.
 */

import { Router } from 'express';
import {
  listBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost
} from '../controllers/blogController.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';
import { asyncHandler } from '../utils/helpers.js';

const router = Router();

router.get('/', asyncHandler(listBlogPosts));
router.get('/:slug', asyncHandler(getBlogPost));
router.post('/', authenticate, authorize('admin'), asyncHandler(createBlogPost));
router.patch('/:slug', authenticate, authorize('admin'), asyncHandler(updateBlogPost));

export default router;
