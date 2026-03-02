/**
 * @file OTP verification component.
 */

'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';

/**
 * OTP verification panel.
 * @param {Object} props - Component props.
 * @param {boolean} [props.loading] - Loading state.
 * @param {string|null} [props.error] - Error message.
 * @param {boolean} [props.enabled] - Empty state toggle.
 * @returns {JSX.Element} OTP UI.
 */
export default function OtpVerify({ loading = false, error = null, enabled = true }) {
  const [otp, setOtp] = useState('');

  if (loading) {
    return (
      <Card>
        <Skeleton className="h-6 w-28" />
        <Skeleton className="mt-3 h-10 w-full" />
      </Card>
    );
  }

  if (error) {
    return <EmptyState title="OTP unavailable" description={error} />;
  }

  if (!enabled) {
    return <EmptyState title="OTP disabled" description="OTP verification is currently unavailable." />;
  }

  return (
    <div className="space-y-3 rounded-xl border border-surface-200 p-4 dark:border-surface-700">
      <h3 className="text-sm font-semibold">Verify OTP</h3>
      <Input value={otp} onChange={(event) => setOtp(event.target.value)} maxLength={6} placeholder="Enter 6-digit OTP" />
      <Button className="w-full">Verify OTP</Button>
    </div>
  );
}
