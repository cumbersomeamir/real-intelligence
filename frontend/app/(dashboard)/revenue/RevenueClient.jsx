'use client';

import { useEffect, useState } from 'react';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import PieChart from '@/components/charts/PieChart';
import BarChart from '@/components/charts/BarChart';
import { formatINR } from '@/lib/formatters';
import { getRevenueSummary } from '@/lib/dataClient';

/**
 * Revenue dashboard client page.
 * @returns {JSX.Element}
 */
export default function RevenueClient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        setData(await getRevenueSummary());
      } catch (loadError) {
        setError(loadError?.message || 'Unable to load revenue data');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Revenue' }]} />
      <div>
        <h1 className="text-3xl font-extrabold">Revenue Dashboard</h1>
        <p className="mt-1 text-sm text-surface-400">Commission realization, subscription health, and lead cost tracking.</p>
      </div>

      {error ? (
        <Card>
          <p className="text-sm text-risk-400">{error}</p>
        </Card>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {(loading
          ? Array.from({ length: 4 })
          : [
              { label: 'Realized Commission', value: formatINR(data?.realizedCommission || 0) },
              { label: 'Expected Commission', value: formatINR(data?.expectedCommission || 0) },
              { label: 'Active Subscriptions', value: Number(data?.activeSubscriptions || 0).toLocaleString('en-IN') },
              { label: 'Cost per Qualified Lead', value: formatINR(data?.leadCost?.costPerQualifiedLead || 0) }
            ]
        ).map((item, index) => (
          <Card key={item?.label || index} className="bg-surface-900/60">
            {loading ? (
              <>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-3 h-8 w-32" />
              </>
            ) : (
              <>
                <p className="text-xs uppercase tracking-wide text-surface-400">{item.label}</p>
                <p className="mt-2 text-2xl font-bold text-white">{item.value}</p>
              </>
            )}
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="bg-surface-900/60">
          <h2 className="text-lg font-semibold">Subscription Mix</h2>
          <div className="mt-3">
            <PieChart data={(data?.subscriptions || []).map((row) => ({ name: row._id || row.plan || 'plan', value: row.count || 0 }))} />
          </div>
        </Card>

        <Card className="bg-surface-900/60">
          <h2 className="text-lg font-semibold">Commission Status</h2>
          <div className="mt-3">
            <BarChart
              data={(data?.commissions || []).slice(0, 10).map((row, index) => ({
                name: `${row.status || 'deal'}-${index + 1}`,
                value: Number(row.commission?.actual || row.commission?.expected || 0)
              }))}
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
