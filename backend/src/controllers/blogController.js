/**
 * @file Blog controller.
 */

import { BlogPost } from '../models/BlogPost.js';

/**
 * Lists blog posts.
 */
export async function listBlogPosts(req, res) {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 20);
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    BlogPost.find({}).sort({ publishedAt: -1, createdAt: -1 }).skip(skip).limit(limit).lean(),
    BlogPost.countDocuments({})
  ]);
  res.json({ items, page, limit, total });
}

/**
 * Gets blog post by slug.
 */
export async function getBlogPost(req, res) {
  const item = await BlogPost.findOne({ slug: req.params.slug }).lean();
  if (!item) return res.status(404).json({ message: 'Blog post not found.' });
  return res.json(item);
}

/**
 * Creates blog post.
 */
export async function createBlogPost(req, res) {
  const item = await BlogPost.create(req.body);
  res.status(201).json(item);
}

/**
 * Updates blog post by slug.
 */
export async function updateBlogPost(req, res) {
  const item = await BlogPost.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
  if (!item) return res.status(404).json({ message: 'Blog post not found.' });
  return res.json(item);
}
