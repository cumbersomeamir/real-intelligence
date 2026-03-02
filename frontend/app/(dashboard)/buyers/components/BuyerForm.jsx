/**
 * @file Buyer intake form component.
 */

'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { createBuyer } from '@/lib/dataClient';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';

const buyerFormSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  budgetMin: z.string().min(1),
  budgetMax: z.string().min(1),
  location: z.string().min(2)
});

/**
 * Buyer intake form.
 * @param {Object} props - Component props.
 * @param {boolean} [props.loading] - Loading state.
 * @param {string|null} [props.error] - Error message.
 * @param {boolean} [props.enabled] - Empty state toggle.
 * @param {Function} [props.onCreated] - Created callback.
 * @returns {JSX.Element} Buyer form card.
 */
export default function BuyerForm({ loading = false, error = null, enabled = true, onCreated }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(buyerFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      budgetMin: '3000000',
      budgetMax: '',
      location: ''
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
    return <EmptyState title="Buyer form unavailable" description={error} />;
  }

  if (!enabled) {
    return <EmptyState title="Buyer form disabled" description="Public buyer intake is currently disabled." />;
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold">Buyer Intake</h3>
      <form
        className="mt-3 space-y-3"
        onSubmit={handleSubmit(async (values) => {
          try {
            const created = await createBuyer({
              name: values.name,
              phone: values.phone,
              budgetMin: Number(values.budgetMin),
              budgetMax: Number(values.budgetMax),
              preferredLocations: [values.location]
            });

            if (onCreated) onCreated(created);
            toast.success('Buyer saved');
            reset();
          } catch (submitError) {
            toast.error(submitError?.message || 'Unable to save buyer');
          }
        })}
      >
        <Input label="Name" error={errors.name?.message} {...register('name')} />
        <Input label="Phone" error={errors.phone?.message} {...register('phone')} />
        <Input label="Budget Min" error={errors.budgetMin?.message} {...register('budgetMin')} />
        <Input label="Budget Max" error={errors.budgetMax?.message} {...register('budgetMax')} />
        <Input label="Preferred Location" error={errors.location?.message} {...register('location')} />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Buyer'}
        </Button>
      </form>
    </Card>
  );
}
