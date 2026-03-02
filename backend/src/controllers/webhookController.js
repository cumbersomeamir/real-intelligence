/**
 * @file Webhook controller.
 */

/**
 * Handles WhatsApp webhook payloads.
 */
export async function whatsappWebhook(req, res) {
  res.status(200).json({ message: 'WhatsApp webhook received.', receivedAt: new Date().toISOString() });
}

/**
 * Handles Razorpay webhook payloads.
 */
export async function razorpayWebhook(req, res) {
  res.status(200).json({ message: 'Razorpay webhook received.', receivedAt: new Date().toISOString() });
}

/**
 * Handles Instagram webhook payloads.
 */
export async function instagramWebhook(req, res) {
  res.status(200).json({ message: 'Instagram webhook received.', receivedAt: new Date().toISOString() });
}
