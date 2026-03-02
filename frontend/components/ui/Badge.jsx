/**
 * @file Badge component.
 */

import { cn } from '@/lib/utils';

/**
 * Badge primitive.
 * @param {Object} props - Component props.
 * @param {'default'|'success'|'warning'|'danger'} [props.variant] - Variant.
 * @param {React.ReactNode} props.children - Label.
 * @returns {JSX.Element} Badge.
 */
export default function Badge({ variant = 'default', className, children }) {
  const styles = {
    default: 'bg-surface-200 text-surface-800 dark:bg-surface-700 dark:text-surface-100',
    success: 'bg-profit-500/15 text-profit-600 dark:text-profit-400',
    warning: 'bg-accent-400/20 text-accent-700',
    danger: 'bg-risk-500/15 text-risk-600 dark:text-risk-400'
  };

  return (
    <span className={cn('inline-flex rounded-full px-2.5 py-1 text-xs font-semibold', styles[variant], className)}>
      {children}
    </span>
  );
}
