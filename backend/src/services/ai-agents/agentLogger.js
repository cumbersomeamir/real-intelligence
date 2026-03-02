/**
 * @file Structured AI agent logger.
 */

import { logger } from '../../config/logger.js';

/**
 * Writes a structured agent log entry.
 * @param {string} agentName - Agent name.
 * @param {string} level - Log level.
 * @param {string} message - Message content.
 * @param {Object} [meta={}] - Additional metadata.
 */
export function logAgent(agentName, level, message, meta = {}) {
  logger.log({ level, message, agentName, ...meta });
}
