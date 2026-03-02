/**
 * @file Infrastructure tender service.
 */

/**
 * Executes fetchInfraTenders service operation.
 * @param {Object} [input={}] - Service input.
 * @returns {Promise<Object>} Service result.
 */
export async function fetchInfraTenders(input = {}) {
  return { ok: true, service: 'fetchInfraTenders', input };
}
