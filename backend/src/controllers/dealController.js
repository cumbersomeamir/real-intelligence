/**
 * @file Deal controller.
 */

import { Deal } from '../models/Deal.js';

/**
 * Lists ranked deals.
 */
export async function listDeals(req, res) {
  const items = await Deal.find({}).sort({ dealScore: -1 }).limit(100).populate('property').lean();
  res.json({ items });
}

/**
 * Returns top five deals.
 */
export async function topDeals(req, res) {
  const items = await Deal.find({}).sort({ dealScore: -1 }).limit(5).populate('property').lean();
  res.json({ items });
}

/**
 * Fetches single deal.
 */
export async function getDeal(req, res) {
  const item = await Deal.findById(req.params.id).populate('property matchedBuyers').lean();
  if (!item) return res.status(404).json({ message: 'Deal not found.' });
  return res.json(item);
}

/**
 * Updates deal status.
 */
export async function updateDealStatus(req, res) {
  const item = await Deal.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!item) return res.status(404).json({ message: 'Deal not found.' });
  return res.json(item);
}

/**
 * Manually matches buyers to a deal.
 */
export async function matchDeal(req, res) {
  const item = await Deal.findByIdAndUpdate(
    req.params.id,
    { $set: { matchedBuyers: req.body.buyerIds || [], status: 'matched' } },
    { new: true }
  );

  if (!item) return res.status(404).json({ message: 'Deal not found.' });
  return res.json(item);
}
