/**
 * @file Content agent implementation.
 */

import { BaseAgent } from './baseAgent.js';
import { generateContentDraft } from '../../social/contentGenerator.js';

export class ContentAgent extends BaseAgent {
  constructor(config = {}) {
    super('ContentAgent', config);
  }

  async execute(task = {}) {
    this.status = 'running';
    const result = await generateContentDraft(task);
    this.status = 'idle';
    return result;
  }
}
