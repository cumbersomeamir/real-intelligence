/**
 * @file AI insight card component.
 */

import Card from '@/components/ui/Card';

/**
 * Insight summary card.
 * @param {Object} props - Props.
 * @param {string} props.title - Insight title.
 * @param {string} props.body - Insight body.
 * @returns {JSX.Element} Insight card.
 */
export default function InsightCard({ title, body }) {
  return (
    <Card>
      <h3 className="text-base font-bold">{title}</h3>
      <p className="mt-2 text-sm text-surface-600 dark:text-surface-300">{body}</p>
    </Card>
  );
}
