/**
 * @file Registration onboarding step list.
 */

import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';

/**
 * Displays onboarding checklist.
 * @param {Object} props - Component props.
 * @param {boolean} [props.loading] - Loading state.
 * @param {string|null} [props.error] - Error state.
 * @param {boolean} [props.enabled] - Empty state toggle.
 * @returns {JSX.Element} Step list.
 */
export default function OnboardingSteps({ loading = false, error = null, enabled = true }) {
  if (loading) {
    return (
      <Card>
        <Skeleton className="h-6 w-28" />
        <Skeleton className="mt-2 h-4 w-full" />
      </Card>
    );
  }

  if (error) {
    return <EmptyState title="Onboarding unavailable" description={error} />;
  }

  if (!enabled) {
    return <EmptyState title="No onboarding steps" description="Onboarding flow is currently disabled." />;
  }

  return (
    <ol className="space-y-2 rounded-xl border border-surface-200 p-4 text-sm dark:border-surface-700">
      <li>1. Create your account</li>
      <li>2. Verify email/phone</li>
      <li>3. Set investment preferences</li>
      <li>4. Configure deal alerts</li>
    </ol>
  );
}
