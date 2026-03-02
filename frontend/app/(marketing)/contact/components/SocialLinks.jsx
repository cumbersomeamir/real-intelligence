/**
 * @file Social links component.
 */

import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';

/**
 * Social profile links.
 * @param {Object} props - Component props.
 * @param {boolean} [props.loading] - Loading state.
 * @param {string|null} [props.error] - Error state.
 * @param {Array<string>} [props.items] - Optional custom links.
 * @returns {JSX.Element} Social links card.
 */
export default function SocialLinks({ loading = false, error = null, items = null }) {
  if (loading) {
    return (
      <Card>
        <Skeleton className="h-6 w-40" />
        <Skeleton className="mt-3 h-4 w-24" />
      </Card>
    );
  }

  if (error) {
    return <EmptyState title="Social links unavailable" description={error} />;
  }

  const links = items?.length ? items : ['Instagram', 'YouTube', 'Twitter', 'LinkedIn', 'WhatsApp'];

  return (
    <Card>
      <h2 className="text-xl font-bold">Social Links</h2>
      <ul className="mt-3 space-y-2 text-sm text-primary-600">
        {links.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}
