/**
 * @file Social login options component.
 */

'use client';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';

/**
 * Renders social login options.
 * @param {Object} props - Component props.
 * @param {boolean} [props.loading] - Loading state.
 * @param {string|null} [props.error] - Error state.
 * @param {boolean} [props.enabled] - Empty state toggle.
 * @returns {JSX.Element} Social buttons.
 */
export default function SocialLogin({ loading = false, error = null, enabled = true }) {
  if (loading) {
    return (
      <Card>
        <Skeleton className="h-10 w-full" />
      </Card>
    );
  }

  if (error) {
    return <EmptyState title="Social login unavailable" description={error} />;
  }

  if (!enabled) {
    return <EmptyState title="Social login disabled" description="Social login is currently unavailable." />;
  }

  return (
    <div className="space-y-2">
      <Button variant="ghost" className="w-full">
        Continue with Google
      </Button>
      <Button variant="ghost" className="w-full">
        Continue with WhatsApp OTP
      </Button>
    </div>
  );
}
