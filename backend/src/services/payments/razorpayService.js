/**
 * @file Razorpay service.
 */

/**
 * Executes createRazorpayOrder service operation.
 * @param {Object} [input={}] - Service input.
 * @returns {Promise<Object>} Service result.
 */
export async function createRazorpayOrder(input = {}) {
  return { ok: true, service: 'createRazorpayOrder', input };
}
