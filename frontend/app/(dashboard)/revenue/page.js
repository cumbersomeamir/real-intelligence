/**
 * @file Revenue dashboard page.
 */

import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import RevenueChart from '@/app/(dashboard)/revenue/components/RevenueChart';
import CommissionTracker from '@/app/(dashboard)/revenue/components/CommissionTracker';
import ROASCard from '@/app/(dashboard)/revenue/components/ROASCard';
import LeadCostAnalysis from '@/app/(dashboard)/revenue/components/LeadCostAnalysis';
import SubscriptionMetrics from '@/app/(dashboard)/revenue/components/SubscriptionMetrics';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for revenue page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'Revenue', description: 'Revenue, commissions, lead cost, and subscription metrics.', path: '/revenue' });
}

/**
 * Revenue dashboard.
 * @returns {JSX.Element} Revenue page.
 */
export default function RevenuePage() {
  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Revenue' }]} />
      <h1 className="text-3xl font-extrabold">Revenue Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <RevenueChart items={['Monthly revenue: ₹48L', 'Quarterly trend: +12%']} />
        <CommissionTracker items={['Expected commission: ₹2.4Cr', 'Collected: ₹1.7Cr']} />
        <ROASCard items={['ROAS: 3.8x']} />
        <LeadCostAnalysis items={['Cost per qualified lead: ₹2,380']} />
        <SubscriptionMetrics items={['Pro active: 342', 'Elite active: 41', 'Churn: 2.1%']} />
      </div>
    </section>
  );
}
