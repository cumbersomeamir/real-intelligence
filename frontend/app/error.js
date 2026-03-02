/**
 * @file Global route error boundary UI.
 */

'use client';

import Button from '@/components/ui/Button';

/**
 * Handles uncaught route errors.
 * @param {Object} props - Error props.
 * @param {Error} props.error - Error object.
 * @param {Function} props.reset - Reset handler.
 * @returns {JSX.Element} Error fallback.
 */
export default function GlobalError({ error, reset }) {
  return (
    <main className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-3 text-surface-600 dark:text-surface-300">{error.message}</p>
      <Button className="mt-6" onClick={reset}>
        Try again
      </Button>
    </main>
  );
}
