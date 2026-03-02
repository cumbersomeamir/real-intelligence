/**
 * @file Buyer match agent implementation.
 */

import { BaseAgent } from './baseAgent.js';
import { runMatchingEngine } from '../../intelligence/matchingEngine.js';

export class BuyerMatchAgent extends BaseAgent {
  constructor(config = {}) {
    super('BuyerMatchAgent', config);
  }

  async execute() {
    this.status = 'running';
    const result = await runMatchingEngine();
    this.status = 'idle';
    return result;
  }
}
