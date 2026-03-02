/**
 * @file Report agent implementation.
 */

import { BaseAgent } from './baseAgent.js';
import { generateReport } from '../../intelligence/reportGenerator.js';

export class ReportAgent extends BaseAgent {
  constructor(config = {}) {
    super('ReportAgent', config);
  }

  async execute(task = {}) {
    this.status = 'running';
    const result = await generateReport(task);
    this.status = 'idle';
    return result;
  }
}
