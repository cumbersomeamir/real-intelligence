/**
 * @file Housing source adapter.
 */

/**
 * Executes scrapeHousing service operation.
 * @param {Object} [input={}] - Service input.
 * @returns {Promise<Object>} Service result.
 */
export async function scrapeHousing(input = {}) {
  return { ok: true, service: 'scrapeHousing', input };
}
