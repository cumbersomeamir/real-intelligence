/**
 * @file Buyer model.
 */

import mongoose from 'mongoose';

const buyerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: String,
    email: String,
    source: { type: String, enum: ['whatsapp', 'instagram', 'website', 'referral'], default: 'website' },
    preferences: {
      budget: { min: Number, max: Number },
      type: [String],
      locations: [String],
      area: { min: Number, max: Number },
      timeline: String,
      purpose: String,
      riskAppetite: String
    },
    engagement: {
      totalInteractions: Number,
      lastContact: Date,
      siteVisits: Number,
      dealsViewed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deal' }],
      stage: {
        type: String,
        enum: ['new', 'qualified', 'site_visit', 'negotiation', 'closed', 'lost'],
        default: 'new'
      }
    },
    whatsapp: {
      optIn: Boolean,
      lastMessage: Date,
      messageCount: Number
    },
    assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tags: [String],
    score: Number
  },
  { timestamps: true }
);

buyerSchema.index({ 'preferences.locations': 1, 'preferences.budget.max': 1 });

export const Buyer = mongoose.models.Buyer || mongoose.model('Buyer', buyerSchema);
