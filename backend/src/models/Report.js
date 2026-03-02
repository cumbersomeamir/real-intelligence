/**
 * @file Report model.
 */

import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true, sparse: true },
    summary: String,
    price: Number,
    pages: Number,
    locationSlug: String,
    fileUrl: String,
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Report = mongoose.models.Report || mongoose.model('Report', reportSchema);
