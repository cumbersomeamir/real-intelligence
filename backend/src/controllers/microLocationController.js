/**
 * @file Micro-location controller.
 */

import { MicroLocation } from '../models/MicroLocation.js';
import { Property } from '../models/Property.js';

/**
 * Lists all micro-locations.
 */
export async function listMicroLocations(req, res) {
  const items = await MicroLocation.find({}).sort({ 'scores.overall': -1 }).lean();
  res.json({ items });
}

/**
 * Gets location detail by slug.
 */
export async function getMicroLocation(req, res) {
  const item = await MicroLocation.findOne({ slug: req.params.slug }).lean();
  if (!item) return res.status(404).json({ message: 'Micro-location not found.' });
  return res.json(item);
}

/**
 * Gets trend data for location.
 */
export async function locationTrends(req, res) {
  const item = await MicroLocation.findOne({ slug: req.params.slug }).select('stats').lean();
  if (!item) return res.status(404).json({ message: 'Micro-location not found.' });
  return res.json({
    trend: {
      priceChange30d: item.stats?.priceChange30d || 0,
      priceChange90d: item.stats?.priceChange90d || 0,
      priceChange1y: item.stats?.priceChange1y || 0
    }
  });
}

/**
 * Gets properties in location.
 */
export async function locationProperties(req, res) {
  const location = await MicroLocation.findOne({ slug: req.params.slug }).lean();
  if (!location) return res.status(404).json({ message: 'Micro-location not found.' });
  const items = await Property.find({ 'location.microLocation': location.name }).limit(100).lean();
  return res.json({ items });
}
