/**
 * @file Office map component.
 */

import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';

/**
 * Office information and map iframe.
 * @param {Object} props - Component props.
 * @param {boolean} [props.loading] - Loading state.
 * @param {string|null} [props.error] - Error state.
 * @param {boolean} [props.enabled] - Empty state toggle.
 * @returns {JSX.Element} Map card.
 */
export default function OfficeMap({ loading = false, error = null, enabled = true }) {
  if (loading) {
    return (
      <Card>
        <Skeleton className="h-6 w-40" />
        <Skeleton className="mt-3 h-64 w-full" />
      </Card>
    );
  }

  if (error) {
    return <EmptyState title="Map unavailable" description={error} />;
  }

  if (!enabled) {
    return <EmptyState title="Map disabled" description="Office map is currently unavailable." />;
  }

  return (
    <Card>
      <h2 className="text-xl font-bold">LuckNow PropIntel by TensorBlue</h2>
      <p className="mt-2 text-sm text-surface-600">Address: Lucknow, Uttar Pradesh, India</p>
      <p className="text-sm text-surface-600">Email: hello@lucknowpropintel.com</p>
      <p className="text-sm text-surface-600">WhatsApp: +91-XXXXXXXXXX</p>
      <p className="text-sm text-surface-600">Hours: Mon–Sat, 10am–7pm IST</p>
      <iframe
        title="Lucknow Office Map"
        src="https://www.google.com/maps?q=Lucknow%2C%20Uttar%20Pradesh&output=embed"
        loading="lazy"
        className="mt-4 h-64 w-full rounded-lg border border-surface-200"
      />
    </Card>
  );
}
