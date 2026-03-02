/**
 * @file AI agent controller.
 */

import { getAgents, getAgent } from '../services/ai-agents/agentRegistry.js';
import { enqueueAgentTask } from '../services/ai-agents/taskQueue.js';
import { AgentTask } from '../models/AgentTask.js';

/**
 * Returns all agents and status.
 */
export async function listAgents(req, res) {
  const agents = getAgents();
  const items = Object.values(agents).map((agent) => ({
    name: agent.name,
    status: agent.status,
    health: agent.getHealth(),
    metrics: agent.getMetrics(),
    config: agent.config
  }));
  res.json({ items });
}

/**
 * Returns single agent detail.
 */
export async function getAgentDetail(req, res) {
  const agent = getAgent(req.params.name);
  if (!agent) return res.status(404).json({ message: 'Agent not found.' });
  return res.json({
    name: agent.name,
    status: agent.status,
    health: agent.getHealth(),
    metrics: agent.getMetrics(),
    config: agent.config
  });
}

/**
 * Triggers agent manually.
 */
export async function triggerAgent(req, res) {
  const agent = getAgent(req.params.name);
  if (!agent) return res.status(404).json({ message: 'Agent not found.' });
  const job = await enqueueAgentTask({ agentName: agent.name, taskType: 'manual', ...req.body });
  res.status(202).json({ message: 'Task queued.', jobId: job.id });
}

/**
 * Updates agent config.
 */
export async function updateAgentConfig(req, res) {
  const agent = getAgent(req.params.name);
  if (!agent) return res.status(404).json({ message: 'Agent not found.' });
  agent.config = { ...agent.config, ...req.body };
  res.json({ message: 'Config updated.', config: agent.config });
}

/**
 * Fetches paginated agent logs.
 */
export async function agentLogs(req, res) {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 20);
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    AgentTask.find({ agentName: req.params.name }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    AgentTask.countDocuments({ agentName: req.params.name })
  ]);

  res.json({ items, page, limit, total });
}

/**
 * Toggles agent status.
 */
export async function toggleAgent(req, res) {
  const agent = getAgent(req.params.name);
  if (!agent) return res.status(404).json({ message: 'Agent not found.' });
  const enabled = Boolean(req.body.enabled);
  agent.status = enabled ? 'idle' : 'paused';
  res.json({ name: agent.name, status: agent.status });
}
