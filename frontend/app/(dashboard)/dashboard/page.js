/**
 * @file Dashboard overview page.
 */

import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import KPICards from '@/app/(dashboard)/dashboard/components/KPICards';
import DealFeed from '@/app/(dashboard)/dashboard/components/DealFeed';
import AlertsFeed from '@/app/(dashboard)/dashboard/components/AlertsFeed';
import QuickActions from '@/app/(dashboard)/dashboard/components/QuickActions';
import MarketPulse from '@/app/(dashboard)/dashboard/components/MarketPulse';
import AIInsightWidget from '@/app/(dashboard)/dashboard/components/AIInsightWidget';
import { deals, kpiData } from '@/lib/mockData';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for dashboard overview.
 * @returns {Promise<import('next').Metadata>} Metadata object.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'Dashboard Overview', description: 'Overview of KPIs, alerts, and market pulse.', path: '/dashboard' });
}

/**
 * Renders dashboard overview.
 * @returns {JSX.Element} Overview page.
 */
export default function DashboardOverviewPage() {
  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard' }]} />
      <h1 className="text-3xl font-extrabold">Overview Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <KPICards items={kpiData.map((item) => `${item.label}: ${item.value} (${item.change})`)} />
        <DealFeed items={deals.slice(0, 6).map((deal) => `${deal.title} · Score ${deal.dealScore}`)} />
        <AlertsFeed items={['Deal score > 85 in Telibagh', 'Price drop detected in Raebareli Road', 'Buyer match created for deal-4']} />
        <QuickActions items={['Create alert rule', 'Trigger scraper run', 'Export this dashboard']} />
        <MarketPulse items={['Active listings: 10,482', 'Median 30d trend: +3.6%', 'Liquidity index: 74/100']} />
        <AIInsightWidget items={['Model suggests Raebareli corridor as short-term alpha zone.']} />
      </div>
    </section>
  );
}
