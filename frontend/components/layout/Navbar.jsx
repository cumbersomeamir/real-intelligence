/**
 * @file Public site navbar.
 */

'use client';

import { useEffect, useState } from 'react';
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
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('propintel.language');
    if (stored) setLanguage(stored);
  }, []);

  function applyLanguage(value) {
    setLanguage(value);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('propintel.language', value);
    }
  }

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
            <button
              type="button"
              className={`rounded-full px-2 py-1 font-semibold ${language === 'en' ? 'bg-surface-100' : 'text-surface-600'}`}
              onClick={() => applyLanguage('en')}
            >
              EN
            </button>
            <button
              type="button"
              className={`rounded-full px-2 py-1 font-semibold ${language === 'hi' ? 'bg-surface-100' : 'text-surface-600'}`}
              onClick={() => applyLanguage('hi')}
            >
              HI
            </button>
          </div>
          <Link href="/login" className="text-sm font-medium text-surface-700 hover:text-primary-500">
            Login
          </Link>
          <Link href="/register" className="hidden sm:inline-flex">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
