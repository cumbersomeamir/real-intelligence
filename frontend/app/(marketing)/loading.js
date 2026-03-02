/**
 * @file Marketing route loading skeleton.
 */

import Skeleton from '@/components/ui/Skeleton';

/**
 * Marketing loading state.
 * @returns {JSX.Element} Skeleton view.
 */
export default function MarketingLoading() {
  return (
    <main className="mx-auto max-w-7xl space-y-4 px-4 py-16">
      <Skeleton className="h-14 w-3/4" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-56 w-full" />
    </main>
  );
}
