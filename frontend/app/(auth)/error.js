/**
 * @file Auth route error boundary.
 */

'use client';

import Button from '@/components/ui/Button';

/**
 * Renders auth route error fallback.
 * @param {Object} props - Error props.
 * @param {Error} props.error - Error object.
 * @param {Function} props.reset - Retry function.
 * @returns {JSX.Element} Error fallback.
 */
export default function AuthError({ error, reset }) {
  return (
    <main className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Auth page error</h1>
      <p className="mt-2 text-sm text-risk-500">{error.message}</p>
      <Button className="mt-4" onClick={reset}>
        Retry
      </Button>
    </main>
  );
}
