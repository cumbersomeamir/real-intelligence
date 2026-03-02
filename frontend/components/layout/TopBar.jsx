/**
 * @file Dashboard top bar.
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Wifi } from 'lucide-react';
import Button from '@/components/ui/Button';
import { getSessionUser, logoutUser } from '@/lib/dataClient';

/**
 * Top bar with realtime status indicator.
 * @param {Object} props - Props.
 * @param {boolean} props.connected - Realtime state.
 * @returns {JSX.Element} Top bar.
 */
export default function TopBar({ connected = true }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getSessionUser());
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-surface-800 bg-surface-950/90 px-4 py-3 backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-surface-300">
          <span className={`h-2.5 w-2.5 rounded-full ${connected ? 'bg-profit-500' : 'bg-risk-500'}`} />
          <span>{connected ? 'Realtime connected' : 'Realtime disconnected'}</span>
        </div>
        <div className="flex items-center gap-3 text-surface-200">
          {user ? <span className="hidden text-xs text-surface-400 md:inline">{user.name}</span> : null}
          <Wifi className="h-4 w-4" />
          <Bell className="h-4 w-4" />
          <Button
            variant="ghost"
            className="border-surface-700 px-3 py-1 text-xs text-surface-200"
            onClick={() => {
              logoutUser();
              router.push('/login');
              router.refresh();
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
