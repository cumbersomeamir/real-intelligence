/**
 * @file Progress bar component.
 */

/**
 * Progress indicator.
 * @param {Object} props - Props.
 * @param {number} props.value - Percent value.
 * @returns {JSX.Element} Progress bar.
 */
export default function ProgressBar({ value = 0 }) {
  const width = Math.min(100, Math.max(0, value));
  const bucket = Math.round(width / 10) * 10;
  const widthClass = {
    0: 'w-0',
    10: 'w-[10%]',
    20: 'w-[20%]',
    30: 'w-[30%]',
    40: 'w-[40%]',
    50: 'w-[50%]',
    60: 'w-[60%]',
    70: 'w-[70%]',
    80: 'w-[80%]',
    90: 'w-[90%]',
    100: 'w-full'
  }[bucket];

  return (
    <div className="h-2 w-full rounded-full bg-surface-200 dark:bg-surface-800" role="progressbar" aria-valuenow={width}>
      <div className={`h-2 rounded-full bg-primary-500 ${widthClass}`} />
    </div>
  );
}
