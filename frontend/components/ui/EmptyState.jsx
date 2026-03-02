/**
 * @file Empty state renderer.
 */

/**
 * Empty state component.
 * @param {Object} props - Props.
 * @param {string} props.title - Title text.
 * @param {string} props.description - Description text.
 * @returns {JSX.Element} Empty state block.
 */
export default function EmptyState({ title, description }) {
  return (
    <div className="rounded-xl border border-dashed border-surface-300 p-8 text-center dark:border-surface-700">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-surface-600 dark:text-surface-300">{description}</p>
    </div>
  );
}
