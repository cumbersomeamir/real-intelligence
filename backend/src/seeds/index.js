/**
 * @file Seed runner.
 */

import { connectDatabase } from '../config/database.js';
import { logger } from '../config/logger.js';
import { MicroLocation } from '../models/MicroLocation.js';
import { Property } from '../models/Property.js';
import { microLocationSeed } from './microLocations.js';
import { samplePropertySeed } from './sampleProperties.js';

/**
 * Seeds database with initial data.
 */
async function seed() {
  await connectDatabase();
  await MicroLocation.deleteMany({});
  await Property.deleteMany({});
  await MicroLocation.insertMany(microLocationSeed);
  await Property.insertMany(samplePropertySeed);
  logger.info(`Seed complete. Locations: ${microLocationSeed.length}, Properties: ${samplePropertySeed.length}`);
  process.exit(0);
}

seed().catch((error) => {
  logger.error({ message: error.message, stack: error.stack });
  process.exit(1);
});
