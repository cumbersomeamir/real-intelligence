/**
 * @file Buyer controller.
 */

import { Buyer } from '../models/Buyer.js';

/**
 * Lists buyers.
 */
export async function listBuyers(req, res) {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 20);
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Buyer.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Buyer.countDocuments({})
  ]);
  res.json({ items, page, limit, total });
}

/**
 * Creates buyer profile.
 */
export async function createBuyer(req, res) {
  const item = await Buyer.create(req.body);
  res.status(201).json(item);
}

/**
 * Fetches buyer by id.
 */
export async function getBuyer(req, res) {
  const item = await Buyer.findById(req.params.id).lean();
  if (!item) return res.status(404).json({ message: 'Buyer not found.' });
  return res.json(item);
}

/**
 * Updates buyer.
 */
export async function updateBuyer(req, res) {
  const item = await Buyer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: 'Buyer not found.' });
  return res.json(item);
}

/**
 * Returns demand heatmap dataset.
 */
export async function demandMap(req, res) {
  const items = await Buyer.aggregate([
    { $unwind: '$preferences.locations' },
    { $group: { _id: '$preferences.locations', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  res.json({ items });
}

/**
 * Returns buyer conversion pipeline stats.
 */
export async function pipelineStats(req, res) {
  const items = await Buyer.aggregate([{ $group: { _id: '$engagement.stage', count: { $sum: 1 } } }]);
  res.json({ items });
}
