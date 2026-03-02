/**
 * @file Minimal tooltip wrapper.
 */

'use client';

/**
 * Tooltip primitive using title fallback.
 * @param {Object} props - Component props.
 * @param {string} props.text - Tooltip text.
 * @param {React.ReactNode} props.children - Target content.
 * @returns {JSX.Element} Tooltip wrapper.
 */
export default function Tooltip({ text, children }) {
  return (
    <span className="cursor-help" title={text} aria-label={text}>
      {children}
    </span>
  );
}
