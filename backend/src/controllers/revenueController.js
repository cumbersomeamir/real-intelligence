/**
 * @file Revenue controller.
 */

import { Deal } from '../models/Deal.js';
import { Subscription } from '../models/Subscription.js';
import { Buyer } from '../models/Buyer.js';

/**
 * Returns revenue KPIs.
 */
export async function revenueOverview(req, res) {
  const [closedDeals, activeSubs] = await Promise.all([
    Deal.find({ status: 'closed' }).lean(),
    Subscription.countDocuments({ status: 'active' })
  ]);

  const realized = closedDeals.reduce((sum, item) => sum + (item.commission?.actual || 0), 0);
  res.json({ realizedCommission: realized, activeSubscriptions: activeSubs });
}

/**
 * Returns commission stats.
 */
export async function commissionTracking(req, res) {
  const items = await Deal.find({}).select('commission status').lean();
  res.json({ items });
}

/**
 * Returns subscription metrics.
 */
export async function subscriptionMetrics(req, res) {
  const items = await Subscription.aggregate([{ $group: { _id: '$plan', count: { $sum: 1 } } }]);
  res.json({ items });
}

/**
 * Returns lead cost analysis.
 */
export async function leadCost(req, res) {
  const qualified = await Buyer.countDocuments({ 'engagement.stage': 'qualified' });
  const spend = Number(req.query.spend || 250000);
  res.json({ spend, qualified, costPerQualifiedLead: qualified ? Number((spend / qualified).toFixed(2)) : 0 });
}
