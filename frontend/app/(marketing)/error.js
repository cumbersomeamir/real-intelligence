/**
 * @file Marketing route error boundary.
 */

'use client';

import Button from '@/components/ui/Button';

/**
 * Marketing error component.
 * @param {Object} props - Error props.
 * @param {Error} props.error - Error object.
 * @param {Function} props.reset - Retry callback.
 * @returns {JSX.Element} Error UI.
 */
export default function MarketingError({ error, reset }) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Unable to load this page</h1>
      <p className="mt-3 text-sm text-risk-500">{error.message}</p>
      <Button className="mt-6" onClick={reset}>
        Reload
      </Button>
    </main>
  );
}
