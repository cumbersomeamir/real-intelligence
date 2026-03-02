/**
 * @file Google Places service.
 */

/**
 * Executes fetchNearbyGooglePlaces service operation.
 * @param {Object} [input={}] - Service input.
 * @returns {Promise<Object>} Service result.
 */
export async function fetchNearbyGooglePlaces(input = {}) {
  return { ok: true, service: 'fetchNearbyGooglePlaces', input };
}
