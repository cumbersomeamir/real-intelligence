/**
 * @file AgentTask model.
 */

import mongoose from 'mongoose';

const agentTaskSchema = new mongoose.Schema(
  {
    agentName: { type: String, required: true },
    taskType: { type: String, required: true },
    status: {
      type: String,
      enum: ['queued', 'running', 'success', 'failed', 'retrying'],
      default: 'queued'
    },
    input: mongoose.Schema.Types.Mixed,
    output: mongoose.Schema.Types.Mixed,
    error: String,
    startedAt: Date,
    completedAt: Date,
    duration: Number,
    retryCount: { type: Number, default: 0 },
    feedback: {
      outcome: { type: String, enum: ['positive', 'negative', 'neutral'] },
      details: String,
      adjustments: mongoose.Schema.Types.Mixed
    }
  },
  { timestamps: true }
);

agentTaskSchema.index({ agentName: 1, status: 1 });
agentTaskSchema.index({ createdAt: -1 });

export const AgentTask = mongoose.models.AgentTask || mongoose.model('AgentTask', agentTaskSchema);
