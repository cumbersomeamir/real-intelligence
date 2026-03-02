/**
 * @file Blog post model.
 */

import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: String,
    content: String,
    category: String,
    author: String,
    readTime: String,
    publishedAt: Date,
    thumbnail: String
  },
  { timestamps: true }
);

export const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);
