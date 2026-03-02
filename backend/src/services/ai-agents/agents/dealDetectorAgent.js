/**
 * @file Deal detector agent implementation.
 */

import { BaseAgent } from './baseAgent.js';
import { runDealEngine } from '../../intelligence/dealEngine.js';

export class DealDetectorAgent extends BaseAgent {
  constructor(config = {}) {
    super('DealDetectorAgent', config);
  }

  async execute() {
    this.status = 'running';
    const result = await runDealEngine();
    this.status = 'idle';
    return result;
  }
}
