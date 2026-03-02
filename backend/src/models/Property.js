/**
 * @file Property model.
 */

import mongoose from 'mongoose';

const priceHistorySchema = new mongoose.Schema(
  {
    price: Number,
    date: Date
  },
  { _id: false }
);

const proximityPlaceSchema = new mongoose.Schema(
  {
    name: String,
    distance: Number,
    rating: Number
  },
  { _id: false }
);

const propertySchema = new mongoose.Schema(
  {
    sourceId: { type: String, required: true },
    source: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ['apartment', 'plot', 'villa', 'commercial'], required: true },
    subType: String,
    price: Number,
    pricePerSqft: Number,
    area: Number,
    location: {
      address: String,
      microLocation: String,
      coordinates: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], default: [80.9462, 26.8467] }
      },
      city: { type: String, default: 'Lucknow' }
    },
    builder: {
      name: String,
      credibilityScore: Number
    },
    amenities: [String],
    images: [String],
    contact: {
      hash: String
    },
    listing: {
      postedDate: Date,
      lastPriceUpdate: Date,
      priceHistory: [priceHistorySchema],
      durationDays: Number,
      status: { type: String, enum: ['active', 'sold', 'expired'], default: 'active' }
    },
    proximity: {
      metro: { distance: Number, travelTime: Number, nearest: String },
      airport: { distance: Number, travelTime: Number },
      schools: [proximityPlaceSchema],
      hospitals: [proximityPlaceSchema],
      highways: { distance: Number, nearest: String },
      itParks: [proximityPlaceSchema],
      commercialHubs: [proximityPlaceSchema]
    },
    scores: {
      fairValue: Number,
      fairValueConfidence: Number,
      discountPercent: Number,
      growthScore: Number,
      liquidityScore: Number,
      riskScore: Number,
      dealScore: Number,
      locationDesirability: Number
    },
    urgency: {
      score: Number,
      signals: [String]
    },
    legal: {
      reraApproved: Boolean,
      reraId: String,
      litigationFlag: Boolean,
      completionStatus: String
    },
    metadata: {
      scraped: Date,
      lastScored: Date,
      lastUpdated: Date,
      version: { type: Number, default: 1 }
    }
  },
  { timestamps: true }
);

propertySchema.index({ 'location.coordinates': '2dsphere' });
propertySchema.index({ 'scores.dealScore': -1 });
propertySchema.index({ source: 1, sourceId: 1 }, { unique: true });

export const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);
