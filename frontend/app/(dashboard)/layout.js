/**
 * @file Dashboard route-group layout.
 */

'use client';

import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import MobileNav from '@/components/layout/MobileNav';
import AIChat from '@/components/ai/AIChat';
import { useRealtime } from '@/hooks/useRealtime';

/**
 * Dashboard layout with dark mode, sidebar, and topbar.
 * @param {Object} props - Props.
 * @param {React.ReactNode} props.children - Child route content.
 * @returns {JSX.Element} Dashboard shell.
 */
export default function DashboardLayout({ children }) {
  const { connected } = useRealtime();

  return (
    <div className="dark min-h-screen bg-surface-950 text-surface-100">
      <div className="flex">
        <Sidebar />
        <div className="min-h-screen flex-1">
          <TopBar connected={connected} />
          <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
        </div>
      </div>
      <AIChat />
      <MobileNav />
    </div>
  );
}
