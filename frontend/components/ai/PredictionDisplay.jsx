/**
 * @file Prediction display block.
 */

import Card from '@/components/ui/Card';

/**
 * Renders model output details.
 * @param {Object} props - Props.
 * @param {string} props.label - Prediction label.
 * @param {string|number} props.value - Prediction value.
 * @returns {JSX.Element} Prediction card.
 */
export default function PredictionDisplay({ label, value }) {
  return (
    <Card>
      <p className="text-xs uppercase tracking-wide text-surface-500">{label}</p>
      <p className="mt-1 font-mono text-2xl font-bold">{value}</p>
    </Card>
  );
}
