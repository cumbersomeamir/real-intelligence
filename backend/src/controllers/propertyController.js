/**
 * @file Property controller.
 */

import { Property } from '../models/Property.js';

/**
 * Lists properties.
 */
export async function listProperties(req, res) {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 20);
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Property.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Property.countDocuments({})
  ]);

  res.json({ items, page, limit, total });
}

/**
 * Fetches single property.
 */
export async function getProperty(req, res) {
  const item = await Property.findById(req.params.id).lean();
  if (!item) return res.status(404).json({ message: 'Property not found.' });
  return res.json(item);
}

/**
 * Searches properties by text and geo location.
 */
export async function searchProperties(req, res) {
  const { q } = req.query;
  const query = q ? { title: { $regex: q, $options: 'i' } } : {};
  const items = await Property.find(query).limit(30).lean();
  res.json({ items });
}

/**
 * Returns map-ready property points.
 */
export async function mapProperties(req, res) {
  const items = await Property.find({}).select('title location.coordinates price scores.dealScore').limit(500).lean();
  const features = items.map((item) => ({
    type: 'Feature',
    geometry: item.location?.coordinates || { type: 'Point', coordinates: [80.9462, 26.8467] },
    properties: { id: item._id, title: item.title, price: item.price, dealScore: item.scores?.dealScore }
  }));
  res.json({ type: 'FeatureCollection', features });
}

/**
 * Returns heatmap aggregate data.
 */
export async function heatmapProperties(req, res) {
  const items = await Property.aggregate([
    {
      $project: {
        lng: { $arrayElemAt: ['$location.coordinates.coordinates', 0] },
        lat: { $arrayElemAt: ['$location.coordinates.coordinates', 1] },
        intensity: '$scores.dealScore'
      }
    },
    { $limit: 1000 }
  ]);
  res.json({ items });
}

/**
 * Returns similar properties.
 */
export async function similarProperties(req, res) {
  const base = await Property.findById(req.params.id).lean();
  if (!base) return res.status(404).json({ message: 'Property not found.' });

  const items = await Property.find({
    _id: { $ne: base._id },
    type: base.type,
    'location.microLocation': base.location?.microLocation
  })
    .limit(10)
    .lean();

  res.json({ items });
}

/**
 * Returns property price history.
 */
export async function propertyHistory(req, res) {
  const item = await Property.findById(req.params.id).select('listing.priceHistory').lean();
  if (!item) return res.status(404).json({ message: 'Property not found.' });
  res.json({ history: item.listing?.priceHistory || [] });
}
