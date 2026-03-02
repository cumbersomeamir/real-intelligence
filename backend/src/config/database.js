/**
 * @file MongoDB connection setup.
 */

import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from './logger.js';

/**
 * Connects to MongoDB.
 * @returns {Promise<void>} Completion promise.
 */
export async function connectDatabase() {
  await mongoose.connect(env.MONGODB_URI);
  logger.info('MongoDB connected');
}
