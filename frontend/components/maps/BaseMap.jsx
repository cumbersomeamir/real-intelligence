/**
 * @file Base map wrapper.
 */

'use client';

/**
 * Placeholder map surface used when map SDK is not initialized.
 * @param {Object} props - Props.
 * @param {React.ReactNode} props.children - Overlay content.
 * @returns {JSX.Element} Map shell.
 */
export default function BaseMap({ children }) {
  return (
    <div className="relative h-[460px] rounded-xl border border-surface-700 bg-surface-900 p-4 text-surface-200">
      <p className="text-sm text-surface-400">Interactive map preview (Mapbox token required for live tiles).</p>
      {children}
    </div>
  );
}
