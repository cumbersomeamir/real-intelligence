/**
 * @file Marker cluster placeholder.
 */

/**
 * Displays cluster count bubble.
 * @param {Object} props - Props.
 * @param {number} props.count - Marker count.
 * @returns {JSX.Element} Cluster badge.
 */
export default function MarkerCluster({ count = 0 }) {
  return (
    <div className="inline-flex items-center rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold text-white">
      {count} listings
    </div>
  );
}
