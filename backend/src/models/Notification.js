/**
 * @file Notification model.
 */

import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    channel: { type: String, enum: ['in_app', 'email', 'whatsapp', 'push'], default: 'in_app' },
    title: String,
    message: String,
    read: { type: Boolean, default: false },
    metadata: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

export const Notification =
  mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
