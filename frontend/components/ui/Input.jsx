/**
 * @file Reusable input component.
 */

'use client';

import { cn } from '@/lib/utils';

/**
 * Input primitive.
 * @param {Object} props - Input props.
 * @param {string} [props.label] - Field label.
 * @param {string} [props.error] - Error text.
 * @returns {JSX.Element} Input field.
 */
export default function Input({ label, error, className, ...rest }) {
  return (
    <label className="block space-y-2 text-sm">
      {label ? <span className="font-medium text-surface-700 dark:text-surface-200">{label}</span> : null}
      <input
        className={cn(
          'w-full rounded-lg border border-surface-300 bg-white px-3 py-2 text-surface-900 outline-none ring-primary-300 transition focus:ring-2 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100',
          error && 'border-risk-500 focus:ring-risk-300',
          className
        )}
        {...rest}
      />
      {error ? <span className="text-xs text-risk-500">{error}</span> : null}
    </label>
  );
}
