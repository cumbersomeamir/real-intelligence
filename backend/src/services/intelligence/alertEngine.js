/**
 * @file Smart alert trigger engine.
 */

import { Deal } from '../../models/Deal.js';
import { Notification } from '../../models/Notification.js';

/**
 * Generates alert notifications for high-conviction deals.
 * @returns {Promise<Object>} Alert summary.
 */
export async function runAlertEngine() {
  const hotDeals = await Deal.find({ dealScore: { $gte: 85 }, status: 'detected' }).limit(20).lean();
  await Promise.all(
    hotDeals.map((deal) =>
      Notification.create({
        title: 'High Conviction Deal Detected',
        message: `Deal ${deal._id} crossed score threshold with score ${deal.dealScore}.`,
        channel: 'in_app'
      })
    )
  );
  return { triggered: hotDeals.length };
}
