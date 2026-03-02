/**
 * @file Email service.
 */

/**
 * Executes sendEmail service operation.
 * @param {Object} [input={}] - Service input.
 * @returns {Promise<Object>} Service result.
 */
export async function sendEmail(input = {}) {
  return { ok: true, service: 'sendEmail', input };
}
