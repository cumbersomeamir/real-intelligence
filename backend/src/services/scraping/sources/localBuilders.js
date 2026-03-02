/**
 * @file Local builders source adapter.
 */

/**
 * Executes scrapeLocalBuilders service operation.
 * @param {Object} [input={}] - Service input.
 * @returns {Promise<Object>} Service result.
 */
export async function scrapeLocalBuilders(input = {}) {
  return { ok: true, service: 'scrapeLocalBuilders', input };
}
