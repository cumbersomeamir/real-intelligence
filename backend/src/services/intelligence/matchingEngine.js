/**
 * @file Buyer-property matching engine.
 */

import { Deal } from '../../models/Deal.js';
import { Buyer } from '../../models/Buyer.js';

/**
 * Matches newly detected deals to qualified buyers.
 * @returns {Promise<Object>} Matching summary.
 */
export async function runMatchingEngine() {
  const deals = await Deal.find({ status: 'detected' }).populate('property').limit(10);
  let matched = 0;

  for (const deal of deals) {
    const location = deal.property?.location?.microLocation;
    if (!location) continue;

    const buyers = await Buyer.find({ 'preferences.locations': location }).limit(5).select('_id');
    if (!buyers.length) continue;

    deal.matchedBuyers = buyers.map((buyer) => buyer._id);
    deal.status = 'matched';
    await deal.save();
    matched += 1;
  }

  return { processed: deals.length, matched };
}
