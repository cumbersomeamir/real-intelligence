/**
 * @file Global loading UI.
 */

import Skeleton from '@/components/ui/Skeleton';

/**
 * Displays global loading placeholders.
 * @returns {JSX.Element} Loading state.
 */
export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl space-y-4 px-4 py-10">
      <Skeleton className="h-12 w-2/3" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-40 w-full" />
    </main>
  );
}
