/**
 * @file Scroll-to-top floating action button.
 */

'use client';

import { ArrowUp } from 'lucide-react';

/**
 * Scrolls viewport to top.
 * @returns {JSX.Element} Button.
 */
export default function ScrollToTop() {
  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 rounded-full bg-primary-500 p-3 text-white shadow-lg"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
