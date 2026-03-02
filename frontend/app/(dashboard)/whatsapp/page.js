/**
 * @file WhatsApp management page.
 */

import WhatsappClient from '@/app/(dashboard)/whatsapp/WhatsappClient';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for WhatsApp page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'WhatsApp Management', description: 'Templates, broadcasts, automation, and delivery metrics.', path: '/whatsapp' });
}

/**
 * WhatsApp page wrapper.
 * @returns {JSX.Element}
 */
export default function WhatsAppPage() {
  return <WhatsappClient />;
}
