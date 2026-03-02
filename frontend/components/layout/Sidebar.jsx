/**
 * @file Dashboard sidebar component.
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DASHBOARD_NAV } from '@/lib/constants';

/**
 * Sidebar navigation for dashboard routes.
 * @returns {JSX.Element} Sidebar.
 */
export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-64 flex-shrink-0 border-r border-surface-800 bg-surface-950 px-4 py-6 lg:block">
      <Link href="/dashboard" className="mb-6 block font-display text-lg font-bold text-white">
        LuckNow PropIntel
      </Link>
      <nav className="space-y-2" aria-label="Dashboard">
        {DASHBOARD_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-lg px-3 py-2 text-sm transition ${
              pathname === item.href
                ? 'bg-primary-500 text-white'
                : 'text-surface-200 hover:bg-surface-800 hover:text-white'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
