/**
 * @file Settings page.
 */

import SettingsClient from '@/app/(dashboard)/settings/SettingsClient';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for settings page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'Settings', description: 'Profile, API keys, notifications, and billing controls.', path: '/settings' });
}

/**
 * Settings page wrapper.
 * @returns {JSX.Element}
 */
export default function SettingsPage() {
  return <SettingsClient />;
}
