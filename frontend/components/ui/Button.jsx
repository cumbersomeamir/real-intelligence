/**
 * @file Reusable button component.
 */

'use client';

import { cn } from '@/lib/utils';

/**
 * Button primitive.
 * @param {Object} props - Component props.
 * @param {'button'|'submit'|'reset'} [props.type] - Button type.
 * @param {'primary'|'secondary'|'ghost'|'danger'} [props.variant] - Visual style.
 * @param {boolean} [props.disabled] - Disabled state.
 * @param {string} [props.className] - Custom classes.
 * @param {React.ReactNode} props.children - Button content.
 * @returns {JSX.Element} Button element.
 */
export default function Button({
  type = 'button',
  variant = 'primary',
  disabled = false,
  className,
  children,
  ...rest
}) {
  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    secondary: 'bg-accent-400 text-surface-900 hover:bg-accent-500',
    ghost: 'bg-transparent border border-surface-300 text-surface-700 hover:bg-surface-100',
    danger: 'bg-risk-500 text-white hover:bg-risk-600'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
