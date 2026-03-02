/**
 * @file Pagination controls.
 */

/**
 * Pagination primitive.
 * @param {Object} props - Props.
 * @param {number} props.page - Current page.
 * @param {number} props.totalPages - Total pages.
 * @param {Function} props.onPageChange - Page change callback.
 * @returns {JSX.Element} Pagination.
 */
export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <nav className="flex items-center gap-2" aria-label="Pagination">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded border border-surface-300 px-3 py-1 text-sm disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-sm text-surface-600 dark:text-surface-300">
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded border border-surface-300 px-3 py-1 text-sm disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  );
}
