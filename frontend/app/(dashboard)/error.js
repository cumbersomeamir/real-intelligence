/**
 * @file Dashboard route error boundary.
 */

'use client';

import Button from '@/components/ui/Button';

/**
 * Dashboard error view.
 * @param {Object} props - Props.
 * @param {Error} props.error - Error object.
 * @param {Function} props.reset - Reset callback.
 * @returns {JSX.Element} Error content.
 */
export default function DashboardError({ error, reset }) {
  return (
    <section className="rounded-xl border border-risk-500/30 bg-risk-500/10 p-6">
      <h1 className="text-xl font-bold">Dashboard error</h1>
      <p className="mt-2 text-sm">{error.message}</p>
      <Button className="mt-4" onClick={reset}>
        Retry
      </Button>
    </section>
  );
}
