/**
 * @file WhatsApp controller.
 */

import { sendWhatsAppMessage } from '../services/messaging/whatsappService.js';

/**
 * Returns message templates.
 */
export async function listTemplates(req, res) {
  res.json({
    items: [
      { id: 'deal_alert', name: 'Deal Alert', body: 'A high-conviction deal matched your criteria.' },
      { id: 'site_visit', name: 'Site Visit Reminder', body: 'Reminder: your site visit is scheduled tomorrow.' }
    ]
  });
}

/**
 * Sends single message.
 */
export async function sendMessage(req, res) {
  const result = await sendWhatsAppMessage(req.body);
  res.status(202).json(result);
}

/**
 * Sends broadcast campaign.
 */
export async function broadcastMessage(req, res) {
  const recipients = req.body.recipients || [];
  const results = await Promise.all(recipients.map((recipient) => sendWhatsAppMessage({ ...req.body, recipient })));
  res.status(202).json({ count: results.length, results });
}

/**
 * Returns delivery stats.
 */
export async function whatsappStats(req, res) {
  res.json({ delivered: 96, read: 71, failed: 2.1 });
}
