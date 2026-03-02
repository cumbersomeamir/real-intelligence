/**
 * @file Realtime abstraction hook with event listener registration.
 */

'use client';

import { useEffect } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';

/**
 * Registers event listeners on websocket.
 * @param {Record<string, Function>} handlers - Event handlers map.
 * @returns {{connected:boolean}} Realtime connection state.
 */
export function useRealtime(handlers = {}) {
  const { socket, connected } = useWebSocket(['subscribe:deals', 'subscribe:market']);

  useEffect(() => {
    if (!socket) return;
    Object.entries(handlers).forEach(([event, handler]) => socket.on(event, handler));
    return () => {
      Object.entries(handlers).forEach(([event, handler]) => socket.off(event, handler));
    };
  }, [socket, handlers]);

  return { connected };
}
