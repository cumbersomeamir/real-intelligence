/**
 * @file Gauge badge style metric component.
 */

/**
 * Gauge value display.
 * @param {Object} props - Props.
 * @param {number} props.value - Numeric score.
 * @returns {JSX.Element} Gauge element.
 */
export default function Gauge({ value = 0 }) {
  const normalized = Math.min(100, Math.max(0, value));
  const tone = normalized >= 80 ? 'text-profit-500' : normalized >= 60 ? 'text-accent-500' : 'text-risk-500';
  return <span className={`font-mono text-2xl font-bold ${tone}`}>{normalized}/100</span>;
}
