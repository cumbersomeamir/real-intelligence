/**
 * @file Report controller.
 */

import { Report } from '../models/Report.js';
import { Transaction } from '../models/Transaction.js';

/**
 * Lists reports.
 */
export async function listReports(req, res) {
  const items = await Report.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
  res.json({ items });
}

/**
 * Fetches report detail.
 */
export async function getReport(req, res) {
  const item = await Report.findById(req.params.id).lean();
  if (!item) return res.status(404).json({ message: 'Report not found.' });
  res.json(item);
}

/**
 * Purchases report.
 */
export async function purchaseReport(req, res) {
  const report = await Report.findById(req.params.id).lean();
  if (!report) return res.status(404).json({ message: 'Report not found.' });

  const txn = await Transaction.create({
    user: req.user.sub,
    amount: report.price,
    status: 'success',
    provider: 'razorpay',
    providerReference: `demo-${Date.now()}`
  });

  res.status(201).json({ message: 'Purchase successful.', transactionId: txn._id, reportId: report._id });
}

/**
 * Returns report download URL.
 */
export async function downloadReport(req, res) {
  const report = await Report.findById(req.params.id).lean();
  if (!report) return res.status(404).json({ message: 'Report not found.' });
  res.json({ url: report.fileUrl || '', expiresIn: 3600 });
}
