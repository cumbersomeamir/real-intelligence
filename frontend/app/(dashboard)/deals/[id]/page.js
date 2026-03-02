/**
 * @file Deal detail page.
 */

import DealDetailClient from '@/app/(dashboard)/deals/[id]/DealDetailClient';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for deal detail.
 * @param {Object} props - Route props.
 * @param {Promise<{id:string}>} props.params - Params.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata({ params }) {
  const { id } = await params;
  return buildMetadata({ title: `Deal ${id}`, description: 'Deal detail view with scoring and buyer matching.', path: `/deals/${id}` });
}

/**
 * Deal detail wrapper.
 * @param {Object} props - Route props.
 * @param {Promise<{id:string}>} props.params - Params.
 * @returns {Promise<JSX.Element>} Detail view.
 */
export default async function DealDetailPage({ params }) {
  const { id } = await params;
  return <DealDetailClient id={id} />;
}
