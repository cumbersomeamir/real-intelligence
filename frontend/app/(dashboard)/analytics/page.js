/**
 * @file Analytics page.
 */

import AnalyticsClient from '@/app/(dashboard)/analytics/AnalyticsClient';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for analytics page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'Analytics', description: 'Market analytics, trends, heatmaps, and forecasts.', path: '/analytics' });
}

/**
 * Analytics page wrapper.
 * @returns {JSX.Element}
 */
export default function AnalyticsPage() {
  return <AnalyticsClient />;
}
