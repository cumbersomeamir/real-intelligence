/**
 * @file OTP verification component.
 */

'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { loginUser } from '@/lib/dataClient';
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [issuedOtp, setIssuedOtp] = useState('');

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
    <div id="otp-verify" className="space-y-3 rounded-xl border border-surface-200 p-4 dark:border-surface-700">
      <h3 className="text-sm font-semibold">Verify OTP</h3>
      <Input value={identifier} onChange={(event) => setIdentifier(event.target.value)} placeholder="Email or phone" />
      <div className="flex gap-2">
        <Input
          value={otp}
          onChange={(event) => setOtp(event.target.value)}
          maxLength={6}
          placeholder="Enter 6-digit OTP"
          className="flex-1"
        />
        <Button
          variant="ghost"
          onClick={() => {
            const generated = String(Math.floor(100000 + Math.random() * 900000));
            setIssuedOtp(generated);
            toast.success(`Demo OTP: ${generated}`);
          }}
        >
          Send OTP
        </Button>
      </div>
      {issuedOtp ? <p className="text-xs text-surface-500">OTP sent in demo mode for {identifier || 'your account'}.</p> : null}
      <Button
        className="w-full"
        onClick={async () => {
          if (!issuedOtp) {
            toast.error('Send OTP first');
            return;
          }

          if (otp !== issuedOtp) {
            toast.error('Invalid OTP');
            return;
          }

          try {
            await loginUser({
              identifier: identifier || 'demo@lucknowpropintel.com',
              password: 'password123'
            });
            toast.success('OTP verified');
            router.push(searchParams.get('next') || '/dashboard');
            router.refresh();
          } catch (loginError) {
            toast.error(loginError.message || 'OTP verification failed');
          }
        }}
      >
        Verify OTP
      </Button>
    </div>
  );
}
