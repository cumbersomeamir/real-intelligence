/**
 * @file Scraper orchestrator service.
 */

import { scrapeNinety9Acres } from './sources/ninety9acres.js';
import { scrapeMagicbricks } from './sources/magicbricks.js';
import { scrapeHousing } from './sources/housing.js';
import { scrapeOlx } from './sources/olx.js';
import { scrapeFacebook } from './sources/facebook.js';
import { scrapeLocalBuilders } from './sources/localBuilders.js';

const adapters = {
  ninety9acres: scrapeNinety9Acres,
  magicbricks: scrapeMagicbricks,
  housing: scrapeHousing,
  olx: scrapeOlx,
  facebook: scrapeFacebook,
  localBuilders: scrapeLocalBuilders
};

/**
 * Runs selected source scraper or all sources.
 * @param {string} [source] - Source key.
 * @returns {Promise<Object>} Scrape summary.
 */
export async function runScrape(source) {
  if (source) {
    if (!adapters[source]) throw new Error('Unknown scraping source.');
    const result = await adapters[source]({ source });
    return { source, result };
  }

  const results = await Promise.all(Object.entries(adapters).map(async ([key, fn]) => ({
    source: key,
    result: await fn({ source: key })
  })));
  return { source: 'all', results };
}
