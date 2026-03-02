/**
 * @file Socket.io initialization and event wiring.
 */

import { Server } from 'socket.io';
import { env } from './env.js';

/**
 * Creates socket server and registers default event handlers.
 * @param {import('http').Server} httpServer - Node HTTP server.
 * @returns {Server} Socket.io instance.
 */
export function createWebSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: env.FRONTEND_URL,
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    socket.on('subscribe:deals', () => socket.join('deals'));
    socket.on('subscribe:market', () => socket.join('market'));
    socket.onAny((event) => {
      if (event.startsWith('subscribe:agent:')) socket.join(event.replace('subscribe:', ''));
      if (event.startsWith('unsubscribe:')) socket.leave(event.replace('unsubscribe:', ''));
    });
  });

  return io;
}
