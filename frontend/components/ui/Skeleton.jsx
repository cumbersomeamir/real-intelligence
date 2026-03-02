/**
 * @file Skeleton loading block.
 */

/**
 * Skeleton placeholder.
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Custom classes.
 * @returns {JSX.Element} Skeleton block.
 */
export default function Skeleton({ className = 'h-4 w-full' }) {
  return <div className={`animate-pulse rounded bg-surface-200 dark:bg-surface-800 ${className}`} />;
}
