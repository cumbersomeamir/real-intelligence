/**
 * @file Lightweight dropdown component.
 */

'use client';

import { useState } from 'react';

/**
 * Dropdown primitive.
 * @param {Object} props - Component props.
 * @param {string} props.label - Trigger label.
 * @param {Array<{label:string,onClick:Function}>} props.items - Menu items.
 * @returns {JSX.Element} Dropdown.
 */
export default function Dropdown({ label, items = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="rounded-lg border border-surface-300 px-3 py-2 text-sm"
        onClick={() => setOpen((value) => !value)}
      >
        {label}
      </button>
      {open ? (
        <div className="absolute right-0 mt-2 w-44 rounded-lg border border-surface-200 bg-white shadow-lg dark:border-surface-700 dark:bg-surface-900">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
              className="block w-full px-3 py-2 text-left text-sm hover:bg-surface-100 dark:hover:bg-surface-800"
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
