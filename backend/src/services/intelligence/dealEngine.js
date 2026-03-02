/**
 * @file Core deal detection engine.
 */

import { Property } from '../../models/Property.js';
import { Deal } from '../../models/Deal.js';

/**
 * Detects high-potential deals from scored properties.
 * @returns {Promise<Object>} Detection summary.
 */
export async function runDealEngine() {
  const candidates = await Property.find({ 'scores.dealScore': { $gte: 70 } })
    .sort({ 'scores.dealScore': -1 })
    .limit(50)
    .lean();

  const created = [];
  for (const property of candidates) {
    const exists = await Deal.findOne({ property: property._id });
    if (exists) continue;

    const deal = await Deal.create({
      property: property._id,
      dealScore: property.scores?.dealScore || 0,
      conviction: (property.scores?.dealScore || 0) >= 85 ? 'high' : (property.scores?.dealScore || 0) >= 75 ? 'medium' : 'low',
      status: 'detected',
      detectedAt: new Date(),
      aiNotes: 'Auto-detected by deal engine based on fair-value discount and risk filters.'
    });

    created.push(deal._id);
  }

  return { scanned: candidates.length, created: created.length };
}
