/**
 * @file Auth route loading state.
 */

import Skeleton from '@/components/ui/Skeleton';

/**
 * Auth loading placeholder.
 * @returns {JSX.Element} Loading UI.
 */
export default function AuthLoading() {
  return (
    <main className="mx-auto max-w-md space-y-3 px-4 py-16">
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-32 w-full" />
    </main>
  );
}
