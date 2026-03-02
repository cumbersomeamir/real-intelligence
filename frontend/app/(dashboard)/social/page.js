/**
 * @file Social dashboard page.
 */

import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import EngagementChart from '@/app/(dashboard)/social/components/EngagementChart';
import ContentCalendar from '@/app/(dashboard)/social/components/ContentCalendar';
import AdPerformance from '@/app/(dashboard)/social/components/AdPerformance';
import DMInbox from '@/app/(dashboard)/social/components/DMInbox';
import ContentGenerator from '@/app/(dashboard)/social/components/ContentGenerator';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for social page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'Social Dashboard', description: 'Instagram engagement, content, and ads analytics.', path: '/social' });
}

/**
 * Social dashboard page.
 * @returns {JSX.Element} Social page.
 */
export default function SocialPage() {
  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Social' }]} />
      <h1 className="text-3xl font-extrabold">Social/Instagram Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <EngagementChart items={['Reach +18%', 'Saves +12%', 'Shares +9%']} />
        <ContentCalendar items={['Mon: Deal reel', 'Wed: Micro-location brief', 'Fri: Weekly pulse']} />
        <AdPerformance items={['CPL ₹190', 'CTR 2.6%', 'ROAS 3.2x']} />
        <DMInbox items={['14 unread buyer DMs', '3 high-intent leads']} />
        <ContentGenerator items={['Generate reel script', 'Generate carousel copy', 'Generate newsletter draft']} />
      </div>
    </section>
  );
}
