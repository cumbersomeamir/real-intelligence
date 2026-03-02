/**
 * @file Cookie consent banner.
 */

'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import Button from '@/components/ui/Button';

/**
 * Cookie banner with dismiss action.
 * @returns {JSX.Element|null} Banner.
 */
export default function CookieConsent() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setAccepted(window.localStorage.getItem('propintel.cookieAccepted') === 'true');
  }, []);

  if (accepted) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-xl border border-surface-200 bg-white p-4 shadow-lg dark:border-surface-800 dark:bg-surface-900">
      <p className="text-sm text-surface-700 dark:text-surface-200">
        We use cookies to improve analytics and alert performance.
      </p>
      <Button
        className="mt-3"
        onClick={() => {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem('propintel.cookieAccepted', 'true');
          }
          setAccepted(true);
        }}
      >
        Accept
      </Button>
    </div>
  );
}
