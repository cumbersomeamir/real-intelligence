/**
 * @file Scraper agent implementation.
 */

import { BaseAgent } from './baseAgent.js';
import { runScrape } from '../../scraping/scraperOrchestrator.js';

export class ScraperAgent extends BaseAgent {
  constructor(config = {}) {
    super('ScraperAgent', config);
  }

  async execute(task = {}) {
    this.status = 'running';
    const result = await runScrape(task.source);
    this.status = 'idle';
    return result;
  }
}
