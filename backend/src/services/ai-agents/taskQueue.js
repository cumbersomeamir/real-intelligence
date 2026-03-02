/**
 * @file BullMQ task queue for agent tasks.
 */

import { Queue, Worker } from 'bullmq';
import { redis } from '../../config/redis.js';
import { getAgent } from './agentRegistry.js';
import { AgentTask } from '../../models/AgentTask.js';

/** Shared queue for agent tasks. */
export const agentQueue = new Queue('agent-tasks', {
  connection: redis
});

/**
 * Enqueues a new agent task.
 * @param {Object} payload - Queue payload.
 * @returns {Promise<import('bullmq').Job>} Queued job.
 */
export async function enqueueAgentTask(payload) {
  return agentQueue.add(payload.agentName, payload, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 1000 }
  });
}

/**
 * Starts queue worker for agent task execution.
 * @returns {Worker} Worker instance.
 */
export function startAgentWorker() {
  const worker = new Worker(
    'agent-tasks',
    async (job) => {
      const agent = getAgent(job.data.agentName);
      if (!agent) throw new Error(`Agent not found: ${job.data.agentName}`);

      const taskRecord = await AgentTask.create({
        agentName: job.data.agentName,
        taskType: job.name,
        status: 'running',
        input: job.data,
        startedAt: new Date()
      });

      const started = Date.now();
      try {
        const output = await agent.execute(job.data);
        taskRecord.status = 'success';
        taskRecord.output = output;
        taskRecord.completedAt = new Date();
        taskRecord.duration = Date.now() - started;
        await taskRecord.save();
        await agent.recordOutcome(String(taskRecord._id), { success: true, output });
        return output;
      } catch (error) {
        taskRecord.status = 'failed';
        taskRecord.error = error.message;
        taskRecord.completedAt = new Date();
        taskRecord.duration = Date.now() - started;
        await taskRecord.save();
        await agent.recordOutcome(String(taskRecord._id), { success: false, error: error.message });
        throw error;
      }
    },
    { connection: redis }
  );

  return worker;
}
