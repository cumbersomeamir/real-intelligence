/**
 * @file Social dashboard page.
 */

import SocialClient from '@/app/(dashboard)/social/SocialClient';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for social page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'Social Dashboard', description: 'Instagram engagement, content, and ads analytics.', path: '/social' });
}

/**
 * Social page wrapper.
 * @returns {JSX.Element}
 */
export default function SocialPage() {
  return <SocialClient />;
}
