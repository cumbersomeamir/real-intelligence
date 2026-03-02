/**
 * @file Card wrapper component.
 */

import { cn } from '@/lib/utils';

/**
 * Card primitive.
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Card body.
 * @returns {JSX.Element} Card container.
 */
export default function Card({ children, className }) {
  return (
    <article
      className={cn(
        'rounded-xl border border-surface-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-surface-800 dark:bg-surface-900',
        className
      )}
    >
      {children}
    </article>
  );
}
