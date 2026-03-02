/**
 * @file Gauge chart wrapper around gauge UI primitive.
 */

import Gauge from '@/components/ui/Gauge';

/**
 * Displays a score gauge.
 * @param {Object} props - Props.
 * @param {number} props.value - Score value.
 * @returns {JSX.Element} Gauge chart.
 */
export default function GaugeChart({ value = 0 }) {
  return (
    <div className="rounded-xl border border-surface-200 p-5 text-center dark:border-surface-800">
      <Gauge value={value} />
    </div>
  );
}
