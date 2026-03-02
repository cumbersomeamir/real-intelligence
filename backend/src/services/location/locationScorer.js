/**
 * @file Location scoring service.
 */

/**
 * Executes computeLocationScore service operation.
 * @param {Object} [input={}] - Service input.
 * @returns {Promise<Object>} Service result.
 */
export async function computeLocationScore(input = {}) {
  return { ok: true, service: 'computeLocationScore', input };
}
