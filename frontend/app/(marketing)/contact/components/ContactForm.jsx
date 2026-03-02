/**
 * @file Contact form component.
 */

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { contactSchema } from '@/lib/validators';
import { submitContactLead } from '@/lib/dataClient';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';

/**
 * Contact form with validation.
 * @param {Object} props - Component props.
 * @param {boolean} [props.loading] - Loading state.
 * @param {string|null} [props.error] - Error message.
 * @param {boolean} [props.enabled] - Empty state toggle.
 * @returns {JSX.Element} Contact form.
 */
export default function ContactForm({ loading = false, error = null, enabled = true }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
      budgetRange: ''
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
    return <EmptyState title="Contact unavailable" description={error} />;
  }

  if (!enabled) {
    return <EmptyState title="Contact disabled" description="Contact intake is currently disabled." />;
  }

  return (
    <Card>
      <h2 className="text-xl font-bold">Contact Form</h2>
      <form
        className="mt-4 space-y-4"
        onSubmit={handleSubmit(async (values) => {
          submitContactLead(values);
          toast.success('Thanks, we received your message.');
          reset();
        })}
      >
        <Input label="Name" error={errors.name?.message} {...register('name')} />
        <Input label="Email" error={errors.email?.message} {...register('email')} />
        <Input label="Phone" error={errors.phone?.message} {...register('phone')} />
        <Select
          label="Subject"
          error={errors.subject?.message}
          {...register('subject')}
          options={[
            { label: 'General Inquiry', value: 'General Inquiry' },
            { label: 'Investment Consultation', value: 'Investment Consultation' },
            { label: 'Partnership', value: 'Partnership' },
            { label: 'Developer Listing', value: 'Developer Listing' },
            { label: 'Bug Report', value: 'Bug Report' },
            { label: 'Feature Request', value: 'Feature Request' }
          ]}
        />
        <Input label="Budget Range (optional)" error={errors.budgetRange?.message} {...register('budgetRange')} />
        <label className="block space-y-2 text-sm">
          <span className="font-medium text-surface-700 dark:text-surface-200">Message</span>
          <textarea
            rows={5}
            className="w-full rounded-lg border border-surface-300 bg-white px-3 py-2 text-surface-900 outline-none ring-primary-300 transition focus:ring-2 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
            {...register('message')}
          />
          {errors.message ? <span className="text-xs text-risk-500">{errors.message.message}</span> : null}
        </label>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Card>
  );
}
