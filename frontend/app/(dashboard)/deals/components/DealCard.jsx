/**
 * @file DealCard component.
 */

import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import Skeleton from '@/components/ui/Skeleton';

/**
 * Renders DealCard with loading/error/empty support.
 * @param {Object} props - Component props.
 * @param {boolean} [props.loading] - Loading state.
 * @param {string|null} [props.error] - Error message.
 * @param {Array<any>} [props.items] - Data items.
 * @returns {JSX.Element} DealCard block.
 */
export default function DealCard({ loading = false, error = null, items = [] }) {
  if (loading) {
    return (
      <Card>
        <Skeleton className="h-6 w-40" />
        <Skeleton className="mt-3 h-4 w-full" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <p className="text-sm text-risk-500">{error}</p>
      </Card>
    );
  }

  if (!items.length) {
    return <EmptyState title="No data" description="No records available yet." />;
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold">DealCard</h3>
      <ul className="mt-3 space-y-2 text-sm text-surface-600 dark:text-surface-300">
        {items.slice(0, 6).map((item, index) => (
          <li key={index} className="rounded-md bg-surface-50 px-3 py-2 dark:bg-surface-800">
            {typeof item === 'string' ? item : JSON.stringify(item)}
          </li>
        ))}
      </ul>
    </Card>
  );
}
