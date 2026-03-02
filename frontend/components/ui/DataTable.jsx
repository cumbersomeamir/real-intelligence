/**
 * @file Data table component.
 */

/**
 * Generic table renderer.
 * @param {Object} props - Props.
 * @param {string[]} props.columns - Header columns.
 * @param {Array<Array<React.ReactNode>>} props.rows - Table rows.
 * @returns {JSX.Element} Table.
 */
export default function DataTable({ columns = [], rows = [] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800">
      <table className="min-w-full text-sm">
        <thead className="bg-surface-50 dark:bg-surface-900">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-4 py-3 text-left font-semibold">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t border-surface-200 dark:border-surface-800">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
