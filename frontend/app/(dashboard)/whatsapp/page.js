/**
 * @file WhatsApp management page.
 */

import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import MessageTemplates from '@/app/(dashboard)/whatsapp/components/MessageTemplates';
import BroadcastManager from '@/app/(dashboard)/whatsapp/components/BroadcastManager';
import ChatView from '@/app/(dashboard)/whatsapp/components/ChatView';
import AutomationRules from '@/app/(dashboard)/whatsapp/components/AutomationRules';
import DeliveryStats from '@/app/(dashboard)/whatsapp/components/DeliveryStats';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for WhatsApp page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'WhatsApp Management', description: 'Templates, broadcasts, automation, and delivery metrics.', path: '/whatsapp' });
}

/**
 * WhatsApp dashboard.
 * @returns {JSX.Element} WhatsApp page.
 */
export default function WhatsAppPage() {
  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'WhatsApp' }]} />
      <h1 className="text-3xl font-extrabold">WhatsApp Management</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <MessageTemplates items={['Deal alert template', 'Site visit reminder', 'Report follow-up']} />
        <BroadcastManager items={['Campaign audience: Pro members', 'Queue size: 482']} />
        <ChatView items={['Recent chats synced', 'Response SLA 6m']} />
        <AutomationRules items={['Deal score > 85 => send alert', 'Buyer match => schedule follow-up']} />
        <DeliveryStats items={['Delivered: 96%', 'Read: 71%', 'Failed: 2.1%']} />
      </div>
    </section>
  );
}
