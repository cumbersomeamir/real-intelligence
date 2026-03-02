/**
 * @file Backend server entrypoint.
 */

import http from 'http';
import { app } from './app.js';
import { env } from './config/env.js';
import { connectDatabase } from './config/database.js';
import { logger } from './config/logger.js';
import { createWebSocketServer } from './config/websocket.js';
import { startAgentWorker } from './services/ai-agents/taskQueue.js';
import { startOrchestrator } from './services/ai-agents/agentOrchestrator.js';

const httpServer = http.createServer(app);
const io = createWebSocketServer(httpServer);
startAgentWorker();
startOrchestrator();

/**
 * Boots backend services and starts HTTP server.
 */
async function bootstrap() {
  await connectDatabase();

  httpServer.listen(env.PORT, () => {
    logger.info(`Backend running on port ${env.PORT}`);
  });

  setInterval(() => {
    io.to('market').emit('market:pulse', {
      timestamp: new Date().toISOString(),
      activeDeals: Math.floor(Math.random() * 50) + 10
    });
  }, 5 * 60 * 1000);
}

bootstrap().catch((error) => {
  logger.error({ message: error.message, stack: error.stack });
  process.exit(1);
});
