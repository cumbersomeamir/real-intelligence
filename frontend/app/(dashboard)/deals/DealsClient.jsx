'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import { formatINR } from '@/lib/formatters';
import { getDeals, updateDealStatus } from '@/lib/dataClient';

/**
 * Deals board client page.
 * @returns {JSX.Element}
 */
export default function DealsClient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deals, setDeals] = useState([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [minScore, setMinScore] = useState('70');

  const loadDeals = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getDeals({
        q,
        status,
        minScore: Number(minScore || 0)
      });
      setDeals(result);
    } catch (loadError) {
      setError(loadError?.message || 'Unable to load deals');
    } finally {
      setLoading(false);
    }
  }, [minScore, q, status]);

  useEffect(() => {
    loadDeals();
  }, [loadDeals]);

  const highConviction = useMemo(() => deals.filter((deal) => deal.dealScore >= 85), [deals]);

  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Deals' }]} />
      <div>
        <h1 className="text-3xl font-extrabold">Deal Board</h1>
        <p className="mt-1 text-sm text-surface-400">Filter, review, and update opportunity pipeline in real time.</p>
      </div>

      <Card className="bg-surface-900/60">
        <div className="grid gap-3 md:grid-cols-4">
          <Input label="Search" value={q} onChange={(event) => setQ(event.target.value)} placeholder="Location or title" />
          <Select
            label="Status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Detected', value: 'detected' },
              { label: 'Matched', value: 'matched' },
              { label: 'Negotiation', value: 'negotiation' },
              { label: 'Closed', value: 'closed' }
            ]}
          />
          <Input
            label="Minimum score"
            type="number"
            min={0}
            max={100}
            value={minScore}
            onChange={(event) => setMinScore(event.target.value)}
          />
          <div className="flex items-end">
            <Button className="w-full" onClick={loadDeals}>
              Refresh Deals
            </Button>
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
          <h2 className="text-lg font-semibold">Live Deals ({deals.length})</h2>
          <div className="mt-4 space-y-3">
            {(loading ? Array.from({ length: 6 }) : deals).map((deal, index) =>
              loading ? (
                <Skeleton key={index} className="h-16 w-full" />
              ) : (
                <article key={deal.id} className="rounded-lg border border-surface-700 bg-surface-900 p-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <Link href={`/deals/${deal.id}`} className="text-base font-semibold text-white hover:text-primary-300">
                        {deal.title}
                      </Link>
                      <p className="text-xs text-surface-400">{deal.microLocation}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">{formatINR(deal.price)}</p>
                      <p className="text-xs text-surface-400">Fair value {formatINR(deal.fairValue)}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge variant={deal.dealScore >= 85 ? 'success' : deal.dealScore >= 70 ? 'warning' : 'danger'}>
                      Score {deal.dealScore}
                    </Badge>
                    <Badge variant="default">{deal.conviction} conviction</Badge>
                    <Badge variant="warning">Discount {deal.discountPercent}%</Badge>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {['detected', 'matched', 'negotiation', 'closed'].map((nextStatus) => (
                      <button
                        key={nextStatus}
                        type="button"
                        className={`rounded-full px-2 py-1 text-xs ${deal.status === nextStatus ? 'bg-primary-500 text-white' : 'bg-surface-800 text-surface-300'}`}
                        onClick={async () => {
                          try {
                            await updateDealStatus(deal.id, nextStatus);
                            setDeals((current) =>
                              current.map((item) => (item.id === deal.id ? { ...item, status: nextStatus } : item))
                            );
                            toast.success('Deal status updated');
                          } catch (updateError) {
                            toast.error(updateError?.message || 'Unable to update status');
                          }
                        }}
                      >
                        {nextStatus}
                      </button>
                    ))}
                  </div>
                </article>
              )
            )}
          </div>
        </Card>

        <Card className="bg-surface-900/60">
          <h2 className="text-lg font-semibold">High Conviction ({highConviction.length})</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {(loading ? [] : highConviction.slice(0, 8)).map((deal) => (
              <li key={deal.id} className="rounded-lg border border-surface-700 bg-surface-900 px-3 py-2">
                <Link href={`/deals/${deal.id}`} className="font-semibold text-white hover:text-primary-300">
                  {deal.title}
                </Link>
                <p className="text-xs text-surface-400">{deal.microLocation} · Score {deal.dealScore}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
