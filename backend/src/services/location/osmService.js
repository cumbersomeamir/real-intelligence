/**
 * @file OSM location service.
 */

/**
 * Executes fetchOsmData service operation.
 * @param {Object} [input={}] - Service input.
 * @returns {Promise<Object>} Service result.
 */
export async function fetchOsmData(input = {}) {
  return { ok: true, service: 'fetchOsmData', input };
}
