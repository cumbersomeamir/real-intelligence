/**
 * @file Agent feedback loop service.
 */

import { AgentTask } from '../../models/AgentTask.js';

/**
 * Records feedback for an agent task.
 * @param {Object} payload - Feedback payload.
 * @returns {Promise<Object>} Saved task record.
 */
export async function recordFeedback(payload) {
  const task = await AgentTask.findById(payload.taskId);
  if (!task) throw new Error('Task not found.');
  task.feedback = {
    outcome: payload.outcome,
    details: payload.details,
    adjustments: payload.adjustments
  };
  return task.save();
}
