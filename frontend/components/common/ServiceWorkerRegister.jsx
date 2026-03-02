/**
 * @file Service worker registration component.
 */

'use client';

import { useEffect } from 'react';

/**
 * Registers service worker for PWA support.
 * @returns {null} No visible UI.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => null);
    }
  }, []);

  return null;
}
