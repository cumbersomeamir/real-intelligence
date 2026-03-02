/**
 * @file Social controller.
 */

import { generateContentDraft } from '../services/social/contentGenerator.js';

/**
 * Returns social dashboard summary.
 */
export async function socialOverview(req, res) {
  res.json({
    engagement: { reach: 124000, saves: 6100, shares: 3200 },
    ads: { spend: 180000, roas: 3.2 }
  });
}

/**
 * Generates social content draft.
 */
export async function generateSocialContent(req, res) {
  const draft = await generateContentDraft(req.body);
  res.json({ draft });
}
