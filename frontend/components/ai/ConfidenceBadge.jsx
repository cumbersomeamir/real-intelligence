/**
 * @file Confidence badge component.
 */

import Badge from '@/components/ui/Badge';

/**
 * Renders confidence score as badge.
 * @param {Object} props - Props.
 * @param {number} props.value - Confidence score.
 * @returns {JSX.Element} Confidence badge.
 */
export default function ConfidenceBadge({ value = 0 }) {
  const variant = value >= 80 ? 'success' : value >= 60 ? 'warning' : 'danger';
  return <Badge variant={variant}>Confidence {value}%</Badge>;
}
