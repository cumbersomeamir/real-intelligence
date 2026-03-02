/**
 * @file Revenue dashboard page.
 */

import RevenueClient from '@/app/(dashboard)/revenue/RevenueClient';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for revenue page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'Revenue', description: 'Revenue, commissions, lead cost, and subscription metrics.', path: '/revenue' });
}

/**
 * Revenue page wrapper.
 * @returns {JSX.Element}
 */
export default function RevenuePage() {
  return <RevenueClient />;
}
