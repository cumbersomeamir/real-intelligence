/**
 * @file User model.
 */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    passwordHash: { type: String },
    role: { type: String, enum: ['admin', 'investor', 'buyer', 'viewer'], default: 'investor' },
    isVerified: { type: Boolean, default: false },
    preferences: {
      language: { type: String, enum: ['en', 'hi'], default: 'en' },
      locations: [String]
    }
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
