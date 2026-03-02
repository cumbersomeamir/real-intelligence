/**
 * @file Public site navbar.
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MARKETING_NAV } from '@/lib/constants';
import Button from '@/components/ui/Button';

/**
 * Marketing navigation bar with i18n toggle placeholder.
 * @returns {JSX.Element} Navbar.
 */
export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-surface-200/70 bg-white/90 backdrop-blur dark:border-surface-800 dark:bg-surface-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-display text-lg font-extrabold text-primary-600">
          LuckNow PropIntel
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {MARKETING_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium ${
                pathname === item.href ? 'text-primary-500' : 'text-surface-700 hover:text-primary-500'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-full border border-surface-300 p-1 text-xs sm:flex">
            <button type="button" className="rounded-full bg-surface-100 px-2 py-1 font-semibold">
              EN
            </button>
            <button type="button" className="rounded-full px-2 py-1 font-semibold text-surface-600">
              HI
            </button>
          </div>
          <Link href="/login" className="text-sm font-medium text-surface-700 hover:text-primary-500">
            Login
          </Link>
          <Button className="hidden sm:inline-flex">Get Started</Button>
        </div>
      </div>
    </header>
  );
}
