/**
 * @file Analytics controller.
 */

import { Property } from '../models/Property.js';
import { MicroLocation } from '../models/MicroLocation.js';

/**
 * Returns market overview KPIs.
 */
export async function marketOverview(req, res) {
  const [propertyCount, locationCount, avgDealScore] = await Promise.all([
    Property.countDocuments({}),
    MicroLocation.countDocuments({}),
    Property.aggregate([{ $group: { _id: null, avg: { $avg: '$scores.dealScore' } } }])
  ]);

  res.json({
    trackedProperties: propertyCount,
    microLocations: locationCount,
    avgDealScore: Number((avgDealScore[0]?.avg || 0).toFixed(2))
  });
}

/**
 * Returns trend snapshots.
 */
export async function trendData(req, res) {
  const items = await MicroLocation.find({}).select('name stats.priceChange30d stats.priceChange90d stats.priceChange1y').lean();
  res.json({ items });
}

/**
 * Returns supply-demand stats.
 */
export async function supplyDemand(req, res) {
  const supply = await Property.countDocuments({ 'listing.status': 'active' });
  const demand = await Property.countDocuments({ 'scores.dealScore': { $gte: 80 } });
  res.json({ supply, demand, ratio: supply ? Number((demand / supply).toFixed(2)) : 0 });
}

/**
 * Returns AI forecast payload.
 */
export async function forecasts(req, res) {
  res.json({
    forecastWindow: 'next_90_days',
    expectedPriceRangeChange: { min: 2.3, max: 4.9 },
    confidence: 78
  });
}

/**
 * Parses and executes natural language query.
 */
export async function aiQuery(req, res) {
  const { query = '' } = req.body;
  const budgetMatch = query.match(/under\s*₹?(\d+)/i);
  const locationMatch = query.match(/in\s+([a-z\s]+)/i);
  const budgetLakh = budgetMatch ? Number(budgetMatch[1]) : 100;
  const maxBudget = budgetLakh * 100000;
  const locationHint = locationMatch ? locationMatch[1].trim() : null;

  const dbQuery = { price: { $lte: maxBudget } };
  if (locationHint) dbQuery['location.microLocation'] = { $regex: locationHint, $options: 'i' };

  const items = await Property.find(dbQuery)
    .sort({ 'scores.dealScore': -1 })
    .limit(25)
    .select('title price location.microLocation scores.dealScore scores.growthScore')
    .lean();

  res.json({ query, interpreted: dbQuery, items });
}
