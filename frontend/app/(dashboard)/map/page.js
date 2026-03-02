/**
 * @file Map intelligence page.
 */

import MapClient from '@/app/(dashboard)/map/MapClient';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for map page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'Interactive Map', description: 'Property heatmap, filters, and marker intelligence.', path: '/map' });
}

/**
 * Map page wrapper.
 * @returns {JSX.Element}
 */
export default function MapPage() {
  return <MapClient />;
}
