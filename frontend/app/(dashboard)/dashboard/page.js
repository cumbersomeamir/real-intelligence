/**
 * @file Dashboard overview page.
 */

import DashboardClient from '@/app/(dashboard)/dashboard/DashboardClient';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for dashboard overview.
 * @returns {Promise<import('next').Metadata>} Metadata object.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'Dashboard Overview', description: 'Overview of KPIs, alerts, and market pulse.', path: '/dashboard' });
}

/**
 * Dashboard page wrapper.
 * @returns {JSX.Element}
 */
export default function DashboardOverviewPage() {
  return <DashboardClient />;
}
