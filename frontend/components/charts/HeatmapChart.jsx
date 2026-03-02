/**
 * @file Heatmap chart placeholder component.
 */

/**
 * Renders a lightweight heatmap-style grid from values.
 * @param {Object} props - Props.
 * @param {number[]} props.values - Numeric values.
 * @returns {JSX.Element} Heatmap block.
 */
export default function HeatmapChart({ values = [] }) {
  if (!values.length) return <div className="rounded-xl border border-dashed p-6 text-sm">No heatmap data available.</div>;

  const max = Math.max(...values);
  const tones = [
    'bg-primary-500/10',
    'bg-primary-500/20',
    'bg-primary-500/30',
    'bg-primary-500/40',
    'bg-primary-500/50',
    'bg-primary-500/60',
    'bg-primary-500/70',
    'bg-primary-500/80',
    'bg-primary-500/90',
    'bg-primary-500'
  ];

  return (
    <div className="grid grid-cols-6 gap-2">
      {values.map((value, index) => {
        const opacity = max ? value / max : 0;
        const toneIndex = Math.max(0, Math.min(tones.length - 1, Math.round(opacity * 9)));
        return (
          <div key={index} className={`h-10 rounded ${tones[toneIndex]}`} aria-label={`Heat value ${value}`} />
        );
      })}
    </div>
  );
}
