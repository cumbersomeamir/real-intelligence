/**
 * @file Ad manager service.
 */

/**
 * Executes updateAdCampaign service operation.
 * @param {Object} [input={}] - Service input.
 * @returns {Promise<Object>} Service result.
 */
export async function updateAdCampaign(input = {}) {
  return { ok: true, service: 'updateAdCampaign', input };
}
