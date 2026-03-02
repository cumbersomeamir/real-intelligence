/**
 * @file Settings page.
 */

import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import ProfileSettings from '@/app/(dashboard)/settings/components/ProfileSettings';
import APIKeys from '@/app/(dashboard)/settings/components/APIKeys';
import NotificationPrefs from '@/app/(dashboard)/settings/components/NotificationPrefs';
import TeamManagement from '@/app/(dashboard)/settings/components/TeamManagement';
import BillingSection from '@/app/(dashboard)/settings/components/BillingSection';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for settings page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'Settings', description: 'Profile, API keys, notifications, and billing controls.', path: '/settings' });
}

/**
 * Settings page content.
 * @returns {JSX.Element} Settings page.
 */
export default function SettingsPage() {
  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Settings' }]} />
      <h1 className="text-3xl font-extrabold">Settings</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <ProfileSettings items={['Update profile', 'Change password']} />
        <APIKeys items={['Create key', 'Rotate key', 'Revoke key']} />
        <NotificationPrefs items={['Email alerts', 'WhatsApp alerts', 'Push notifications']} />
        <TeamManagement items={['Invite teammate', 'Assign role', 'Audit activity']} />
        <BillingSection items={['Current plan: Pro', 'Renewal: 18 Sep 2026']} />
      </div>
    </section>
  );
}
