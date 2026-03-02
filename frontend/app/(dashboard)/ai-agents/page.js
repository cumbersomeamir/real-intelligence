/**
 * @file AI agents control center page.
 */

import AIAgentsClient from '@/app/(dashboard)/ai-agents/AIAgentsClient';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for AI agents page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'AI Agent Control Center', description: 'Monitor and configure autonomous platform agents.', path: '/ai-agents' });
}

/**
 * AI agents page wrapper.
 * @returns {JSX.Element}
 */
export default function AIAgentsPage() {
  return <AIAgentsClient />;
}
