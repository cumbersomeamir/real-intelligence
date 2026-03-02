/**
 * @file Sonner toast wrapper.
 */

'use client';

import { Toaster } from 'sonner';

/**
 * Global toast container.
 * @returns {JSX.Element} Toaster instance.
 */
export default function Toast() {
  return <Toaster position="top-right" richColors />;
}
