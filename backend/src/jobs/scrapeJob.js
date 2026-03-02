/**
 * @file Scraping background job.
 */

/**
 * Executes runScrapeJob workflow.
 * @param {Object} [input={}] - Job input.
 * @returns {Promise<Object>} Job result.
 */
export async function runScrapeJob(input = {}) {
  return { ok: true, job: 'runScrapeJob', input };
}
