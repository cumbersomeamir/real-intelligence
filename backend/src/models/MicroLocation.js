/**
 * @file MicroLocation model.
 */

import mongoose from 'mongoose';

const infrastructureSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    status: String,
    expectedDate: Date,
    tenderValue: Number,
    distance: Number
  },
  { _id: false }
);

const faqSchema = new mongoose.Schema(
  {
    q: String,
    a: String
  },
  { _id: false }
);

const microLocationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    city: { type: String, default: 'Lucknow' },
    boundaries: { type: Object },
    center: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [80.9462, 26.8467]
      }
    },
    stats: {
      avgPricePerSqft: Number,
      medianPrice: Number,
      priceChange30d: Number,
      priceChange90d: Number,
      priceChange1y: Number,
      transactionCount30d: Number,
      avgListingDuration: Number,
      activeListings: Number,
      rentalYield: Number
    },
    scores: {
      growth: Number,
      liquidity: Number,
      risk: Number,
      overall: Number
    },
    infrastructure: {
      upcoming: [infrastructureSchema],
      existing: [infrastructureSchema]
    },
    developers: [
      {
        name: String,
        projects: Number,
        avgRating: Number
      }
    ],
    circleRate: Number,
    zoningType: String,
    seoContent: {
      title: String,
      description: String,
      longDescription: String,
      faqs: [faqSchema]
    }
  },
  { timestamps: true }
);

microLocationSchema.index({ slug: 1 }, { unique: true });
microLocationSchema.index({ center: '2dsphere' });

export const MicroLocation = mongoose.models.MicroLocation || mongoose.model('MicroLocation', microLocationSchema);
