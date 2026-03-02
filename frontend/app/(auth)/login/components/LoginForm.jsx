/**
 * @file Login form component.
 */

'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { loginSchema } from '@/lib/validators';
import { loginUser } from '@/lib/dataClient';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';

/**
 * Login form for credentials sign-in.
 * @param {Object} props - Props.
 * @param {Function} [props.onSubmitForm] - Submit handler.
 * @param {boolean} [props.loading] - Loading state.
 * @param {string|null} [props.error] - Error state.
 * @param {boolean} [props.enabled] - Empty state toggle.
 * @returns {JSX.Element} Login form.
 */
export default function LoginForm({ onSubmitForm, loading = false, error = null, enabled = true }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '' }
  });

  if (loading) {
    return (
      <Card>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="mt-3 h-10 w-full" />
      </Card>
    );
  }

  if (error) {
    return <EmptyState title="Login unavailable" description={error} />;
  }

  if (!enabled) {
    return <EmptyState title="Login disabled" description="Login is temporarily disabled for maintenance." />;
  }

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(async (values) => {
        setSubmitError('');

        try {
          if (onSubmitForm) {
            await onSubmitForm(values);
          } else {
            await loginUser(values);
            toast.success('Welcome back');
            router.push(searchParams.get('next') || '/dashboard');
            router.refresh();
          }
        } catch (submitErr) {
          const message = submitErr?.message || 'Unable to login.';
          setSubmitError(message);
          toast.error(message);
        }
      })}
    >
      <Input label="Email or Phone" placeholder="you@example.com" error={errors.identifier?.message} {...register('identifier')} />
      <Input label="Password" type="password" placeholder="••••••••" error={errors.password?.message} {...register('password')} />
      {submitError ? <p className="text-xs text-risk-500">{submitError}</p> : null}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Login'}
      </Button>
    </form>
  );
}
