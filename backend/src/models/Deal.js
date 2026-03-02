/**
 * @file Deal model.
 */

import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema(
  {
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    dealScore: Number,
    status: {
      type: String,
      enum: ['detected', 'verified', 'matched', 'site_visit', 'negotiation', 'closed', 'dead'],
      default: 'detected'
    },
    conviction: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    matchedBuyers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Buyer' }],
    commission: { expected: Number, actual: Number },
    timeline: [
      {
        event: String,
        date: Date,
        notes: String
      }
    ],
    aiNotes: String,
    detectedAt: Date,
    closedAt: Date
  },
  { timestamps: true }
);

dealSchema.index({ dealScore: -1, status: 1 });

export const Deal = mongoose.models.Deal || mongoose.model('Deal', dealSchema);
