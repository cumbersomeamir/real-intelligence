/**
 * @file Scraped listing model.
 */

import mongoose from 'mongoose';

const scrapedListingSchema = new mongoose.Schema(
  {
    source: String,
    sourceId: String,
    payload: mongoose.Schema.Types.Mixed,
    scrapedAt: { type: Date, default: Date.now },
    status: { type: String, default: 'new' }
  },
  { timestamps: true }
);

scrapedListingSchema.index({ source: 1, sourceId: 1 }, { unique: true });

export const ScrapedListing =
  mongoose.models.ScrapedListing || mongoose.model('ScrapedListing', scrapedListingSchema);
