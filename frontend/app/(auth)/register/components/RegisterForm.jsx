/**
 * @file Registration form component.
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { registerSchema } from '@/lib/validators';
import { registerUser } from '@/lib/dataClient';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import RoleSelector from '@/app/(auth)/register/components/RoleSelector';
import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';

/**
 * Register form.
 * @param {Object} props - Props.
 * @param {Function} [props.onSubmitForm] - Callback on submit.
 * @param {boolean} [props.loading] - Loading state.
 * @param {string|null} [props.error] - Error message.
 * @param {boolean} [props.enabled] - Empty state toggle.
 * @returns {JSX.Element} Register form.
 */
export default function RegisterForm({ onSubmitForm, loading = false, error = null, enabled = true }) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: 'investor',
      password: ''
    }
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
    return <EmptyState title="Registration unavailable" description={error} />;
  }

  if (!enabled) {
    return <EmptyState title="Registration disabled" description="Registration is currently paused." />;
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
            await registerUser(values);
            toast.success('Account created');
            router.push('/dashboard');
            router.refresh();
          }
        } catch (submitErr) {
          const message = submitErr?.message || 'Unable to create account.';
          setSubmitError(message);
          toast.error(message);
        }
      })}
    >
      <Input label="Full Name" error={errors.name?.message} {...register('name')} />
      <Input label="Email" error={errors.email?.message} {...register('email')} />
      <Input label="Phone" error={errors.phone?.message} {...register('phone')} />
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <RoleSelector value={field.value} onChange={field.onChange} error={errors.role?.message} />
        )}
      />
      <Input label="Password" type="password" error={errors.password?.message} {...register('password')} />
      {submitError ? <p className="text-xs text-risk-500">{submitError}</p> : null}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  );
}
