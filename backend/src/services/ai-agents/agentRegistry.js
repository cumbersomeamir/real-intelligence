/**
 * @file Agent registry service.
 */

import { ScraperAgent } from './agents/scraperAgent.js';
import { ValuationAgent } from './agents/valuationAgent.js';
import { DealDetectorAgent } from './agents/dealDetectorAgent.js';
import { BuyerMatchAgent } from './agents/buyerMatchAgent.js';
import { ContentAgent } from './agents/contentAgent.js';
import { OutreachAgent } from './agents/outreachAgent.js';
import { ReportAgent } from './agents/reportAgent.js';
import { MonitorAgent } from './agents/monitorAgent.js';

const registry = {
  ScraperAgent: new ScraperAgent(),
  ValuationAgent: new ValuationAgent(),
  DealDetectorAgent: new DealDetectorAgent(),
  BuyerMatchAgent: new BuyerMatchAgent(),
  ContentAgent: new ContentAgent(),
  OutreachAgent: new OutreachAgent(),
  ReportAgent: new ReportAgent(),
  MonitorAgent: new MonitorAgent()
};

/**
 * Returns all registered agents.
 * @returns {Record<string, import('./agents/baseAgent.js').BaseAgent>} Agent map.
 */
export function getAgents() {
  return registry;
}

/**
 * Returns a single agent by name.
 * @param {string} name - Agent name.
 * @returns {import('./agents/baseAgent.js').BaseAgent|undefined} Agent instance.
 */
export function getAgent(name) {
  return registry[name];
}
