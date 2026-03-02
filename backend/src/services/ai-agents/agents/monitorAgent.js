/**
 * @file Monitor agent implementation.
 */

import { BaseAgent } from './baseAgent.js';

export class MonitorAgent extends BaseAgent {
  constructor(config = {}) {
    super('MonitorAgent', config);
  }

  async execute() {
    this.status = 'running';
    const result = {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date().toISOString()
    };
    this.status = 'idle';
    return result;
  }
}
