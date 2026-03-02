/**
 * @file Reusable select component.
 */

'use client';

import { cn } from '@/lib/utils';

/**
 * Select primitive.
 * @param {Object} props - Component props.
 * @param {string} [props.label] - Field label.
 * @param {Array<{label:string,value:string}>} [props.options] - Options list.
 * @param {string} [props.error] - Error text.
 * @returns {JSX.Element} Select element.
 */
export default function Select({ label, options = [], error, className, ...rest }) {
  return (
    <label className="block space-y-2 text-sm">
      {label ? <span className="font-medium text-surface-700 dark:text-surface-200">{label}</span> : null}
      <select
        className={cn(
          'w-full rounded-lg border border-surface-300 bg-white px-3 py-2 text-surface-900 outline-none ring-primary-300 transition focus:ring-2 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100',
          error && 'border-risk-500 focus:ring-risk-300',
          className
        )}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span className="text-xs text-risk-500">{error}</span> : null}
    </label>
  );
}
