/**
 * @file OLX source adapter.
 */

/**
 * Executes scrapeOlx service operation.
 * @param {Object} [input={}] - Service input.
 * @returns {Promise<Object>} Service result.
 */
export async function scrapeOlx(input = {}) {
  return { ok: true, service: 'scrapeOlx', input };
}
