/**
 * @file Tabs component.
 */

'use client';

/**
 * Simple tabs renderer.
 * @param {Object} props - Component props.
 * @param {Array<{id:string,label:string}>} props.items - Tabs list.
 * @param {string} props.value - Active id.
 * @param {Function} props.onChange - Change handler.
 * @returns {JSX.Element} Tabs.
 */
export default function Tabs({ items = [], value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            value === item.id
              ? 'bg-primary-500 text-white'
              : 'bg-surface-100 text-surface-700 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-200'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
