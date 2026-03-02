/**
 * @file Master AI agent orchestrator.
 */

import cron from 'node-cron';
import { enqueueAgentTask } from './taskQueue.js';
import { getAgents } from './agentRegistry.js';
import { logAgent } from './agentLogger.js';

const schedules = {
  ScraperAgent: '0 */6 * * *',
  DealDetectorAgent: '0 * * * *',
  ContentAgent: '0 9 * * *',
  ReportAgent: '0 10 * * 1',
  MonitorAgent: '*/5 * * * *'
};

/**
 * Starts orchestrator schedules for all configured agents.
 * @returns {Object} Active jobs.
 */
export function startOrchestrator() {
  const jobs = {};
  const agents = getAgents();

  Object.entries(schedules).forEach(([name, schedule]) => {
    if (!agents[name]) return;

    jobs[name] = cron.schedule(schedule, async () => {
      await enqueueAgentTask({ agentName: name, taskType: 'scheduled' });
      logAgent(name, 'info', 'Scheduled task enqueued.');
    });
  });

  return jobs;
}
