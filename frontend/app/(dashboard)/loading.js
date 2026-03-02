/**
 * @file Dashboard route loading state.
 */

import Skeleton from '@/components/ui/Skeleton';

/**
 * Dashboard loading skeleton.
 * @returns {JSX.Element} Loading UI.
 */
export default function DashboardLoading() {
  return (
    <section className="space-y-3">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
    </section>
  );
}
