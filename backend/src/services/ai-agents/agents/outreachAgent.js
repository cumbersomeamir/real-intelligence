/**
 * @file Outreach agent implementation.
 */

import { BaseAgent } from './baseAgent.js';
import { sendWhatsAppMessage } from '../../messaging/whatsappService.js';

export class OutreachAgent extends BaseAgent {
  constructor(config = {}) {
    super('OutreachAgent', config);
  }

  async execute(task = {}) {
    this.status = 'running';
    const result = await sendWhatsAppMessage(task);
    this.status = 'idle';
    return result;
  }
}
