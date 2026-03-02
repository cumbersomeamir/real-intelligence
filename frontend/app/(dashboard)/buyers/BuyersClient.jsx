'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Skeleton from '@/components/ui/Skeleton';
import BuyerForm from '@/app/(dashboard)/buyers/components/BuyerForm';
import BarChart from '@/components/charts/BarChart';
import { formatINR } from '@/lib/formatters';
import { getBuyers, getBuyerDemandMap, getBuyerPipeline } from '@/lib/dataClient';

/**
 * Buyers dashboard client page.
 * @returns {JSX.Element}
 */
export default function BuyersClient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [buyers, setBuyers] = useState([]);
  const [demandMap, setDemandMap] = useState([]);
  const [pipeline, setPipeline] = useState([]);
  const [q, setQ] = useState('');
  const [stage, setStage] = useState('all');

  async function load() {
    setLoading(true);
    setError('');

    try {
      const [buyersData, mapData, pipelineData] = await Promise.all([
        getBuyers(),
        getBuyerDemandMap(),
        getBuyerPipeline()
      ]);

      setBuyers(buyersData);
      setDemandMap(mapData);
      setPipeline(pipelineData);
    } catch (loadError) {
      setError(loadError?.message || 'Unable to load buyers');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filteredBuyers = useMemo(() => {
    const term = q.trim().toLowerCase();
    return buyers.filter((buyer) => {
      if (stage !== 'all' && buyer.stage !== stage) return false;
      if (term && !`${buyer.name} ${buyer.phone} ${buyer.email}`.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [buyers, q, stage]);

  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Buyers' }]} />
      <div>
        <h1 className="text-3xl font-extrabold">Buyers</h1>
        <p className="mt-1 text-sm text-surface-400">Lead intake, qualification pipeline, and demand concentration across micro-locations.</p>
      </div>

      <Card className="bg-surface-900/60">
        <div className="grid gap-3 md:grid-cols-3">
          <Input label="Search" value={q} onChange={(event) => setQ(event.target.value)} placeholder="Name, phone, email" />
          <Select
            label="Stage"
            value={stage}
            onChange={(event) => setStage(event.target.value)}
            options={[
              { label: 'All', value: 'all' },
              { label: 'New', value: 'new' },
              { label: 'Qualified', value: 'qualified' },
              { label: 'Site Visit', value: 'site_visit' },
              { label: 'Negotiation', value: 'negotiation' },
              { label: 'Closed', value: 'closed' }
            ]}
          />
          <div className="flex items-end">
            <button type="button" className="w-full rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white" onClick={load}>
              Refresh
            </button>
          </div>
        </div>
      </Card>

      {error ? (
        <Card>
          <p className="text-sm text-risk-400">{error}</p>
        </Card>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="bg-surface-900/60 xl:col-span-2">
          <h2 className="text-lg font-semibold">Buyer Pipeline ({filteredBuyers.length})</h2>
          <div className="mt-4 space-y-2">
            {(loading ? Array.from({ length: 6 }) : filteredBuyers).map((buyer, index) =>
              loading ? (
                <Skeleton key={index} className="h-14 w-full" />
              ) : (
                <Link key={buyer.id} href={`/buyers/${buyer.id}`} className="block rounded-lg border border-surface-700 bg-surface-900 px-3 py-2 hover:border-primary-400">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-white">{buyer.name}</p>
                      <p className="text-xs text-surface-400">
                        {buyer.stage} · {buyer.source}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">{formatINR(buyer.budgetMin)} - {formatINR(buyer.budgetMax)}</p>
                      <p className="text-xs text-surface-400">Score {buyer.score}</p>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="bg-surface-900/60">
            <h2 className="text-lg font-semibold">Stage Distribution</h2>
            <div className="mt-3">
              <BarChart data={(pipeline || []).map((row) => ({ name: row.stage, value: row.count }))} />
            </div>
          </Card>
          <Card className="bg-surface-900/60">
            <h2 className="text-lg font-semibold">Location Demand</h2>
            <div className="mt-3">
              <BarChart data={(demandMap || []).map((row) => ({ name: row.name, value: row.value }))} />
            </div>
          </Card>
        </div>
      </div>

      <BuyerForm onCreated={(created) => setBuyers((current) => [created, ...current])} />
    </section>
  );
}
