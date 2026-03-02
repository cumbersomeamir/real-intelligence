/**
 * @file Socket.io client hook for realtime updates.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { WS_URL } from '@/lib/constants';

const REALTIME_ENABLED = process.env.NEXT_PUBLIC_ENABLE_REALTIME === 'true';

/**
 * Creates and manages websocket connection.
 * @param {string[]} channels - Channels to subscribe.
 * @returns {{socket:any,connected:boolean}} Connection state.
 */
export function useWebSocket(channels = []) {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!REALTIME_ENABLED) {
      setConnected(false);
      return () => null;
    }

    socketRef.current = io(WS_URL, { transports: ['websocket'] });

    socketRef.current.on('connect', () => {
      setConnected(true);
      channels.forEach((channel) => socketRef.current.emit(channel));
    });

    socketRef.current.on('disconnect', () => setConnected(false));

    return () => {
      channels.forEach((channel) => socketRef.current?.emit(`unsubscribe:${channel}`));
      socketRef.current?.disconnect();
    };
  }, [channels]);

  return { socket: socketRef.current, connected };
}
