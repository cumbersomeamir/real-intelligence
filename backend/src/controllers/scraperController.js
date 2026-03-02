/**
 * @file Scraper controller.
 */

import { runScrape } from '../services/scraping/scraperOrchestrator.js';
import { ScrapedListing } from '../models/ScrapedListing.js';

/**
 * Returns source status overview.
 */
export async function scraperStatus(req, res) {
  const items = [
    { source: 'ninety9acres', status: 'healthy' },
    { source: 'magicbricks', status: 'healthy' },
    { source: 'housing', status: 'degraded' },
    { source: 'olx', status: 'healthy' },
    { source: 'facebook', status: 'healthy' },
    { source: 'localBuilders', status: 'healthy' }
  ];
  res.json({ items });
}

/**
 * Triggers source scrape.
 */
export async function triggerScrape(req, res) {
  const data = await runScrape(req.params.source);
  res.json(data);
}

/**
 * Returns crawl history.
 */
export async function crawlHistory(req, res) {
  const items = await ScrapedListing.find({}).sort({ createdAt: -1 }).limit(100).lean();
  res.json({ items });
}

/**
 * Returns data quality metrics.
 */
export async function dataQuality(req, res) {
  const total = await ScrapedListing.countDocuments({});
  const deduped = await ScrapedListing.countDocuments({ status: 'deduplicated' });
  res.json({ total, deduped, dedupRatio: total ? Number((deduped / total).toFixed(2)) : 0 });
}
