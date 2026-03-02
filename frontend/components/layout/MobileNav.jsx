/**
 * @file Mobile navigation drawer.
 */

'use client';

import Link from 'next/link';
import { DASHBOARD_NAV } from '@/lib/constants';

/**
 * Compact mobile dashboard nav.
 * @returns {JSX.Element} Mobile nav.
 */
export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-4 gap-1 border-t border-surface-800 bg-surface-950 p-2 lg:hidden" aria-label="Mobile dashboard">
      {DASHBOARD_NAV.slice(0, 8).map((item) => (
        <Link key={item.href} href={item.href} className="rounded-md px-2 py-2 text-center text-xs text-surface-200 hover:bg-surface-800">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
