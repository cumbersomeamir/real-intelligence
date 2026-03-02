/**
 * @file Transaction model.
 */

import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: Number,
    currency: { type: String, default: 'INR' },
    status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
    provider: { type: String, default: 'razorpay' },
    providerReference: String,
    metadata: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

export const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
