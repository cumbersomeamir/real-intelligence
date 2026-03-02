/**
 * @file SMS service.
 */

/**
 * Executes sendSms service operation.
 * @param {Object} [input={}] - Service input.
 * @returns {Promise<Object>} Service result.
 */
export async function sendSms(input = {}) {
  return { ok: true, service: 'sendSms', input };
}
