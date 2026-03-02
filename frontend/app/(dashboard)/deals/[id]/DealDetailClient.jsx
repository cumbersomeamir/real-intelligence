'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Skeleton from '@/components/ui/Skeleton';
import { formatINR } from '@/lib/formatters';
import { getDeal, getBuyers, matchDealToBuyers, updateDealStatus } from '@/lib/dataClient';

/**
 * Deal detail client page.
 * @param {Object} props - Props.
 * @param {string} props.id - Deal id.
 * @returns {JSX.Element}
 */
export default function DealDetailClient({ id }) {
  const [loading, setLoading] = useState(true);
  const [deal, setDeal] = useState(null);
  const [buyers, setBuyers] = useState([]);
  const [error, setError] = useState('');
  const [selectedBuyerIds, setSelectedBuyerIds] = useState([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const [dealData, buyersData] = await Promise.all([getDeal(id), getBuyers()]);
        setDeal(dealData);
        setBuyers(buyersData);
        setSelectedBuyerIds(dealData?.matchedBuyers || []);
      } catch (loadError) {
        setError(loadError?.message || 'Unable to load deal detail');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <section className="space-y-4">
        <Skeleton className="h-6 w-72" />
        <Skeleton className="h-32 w-full" />
      </section>
    );
  }

  if (!deal) {
    return (
      <section className="space-y-4">
        <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Deals', href: '/deals' }, { label: id }]} />
        <Card>
          <p className="text-sm text-risk-400">{error || 'Deal not found.'}</p>
          <Link href="/deals" className="mt-3 inline-block text-sm font-semibold text-primary-300">
            Back to deals
          </Link>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Deals', href: '/deals' }, { label: deal.id }]} />
      <div>
        <h1 className="text-3xl font-extrabold">{deal.title}</h1>
        <p className="mt-1 text-sm text-surface-400">{deal.microLocation}</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2 bg-surface-900/60">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-surface-400">Current price</p>
              <p className="mt-1 text-xl font-bold text-white">{formatINR(deal.price)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-surface-400">Estimated fair value</p>
              <p className="mt-1 text-xl font-bold text-white">{formatINR(deal.fairValue)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-surface-400">Discount</p>
              <p className="mt-1 text-xl font-bold text-profit-400">{deal.discountPercent}%</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-surface-400">Conviction</p>
              <p className="mt-1 text-xl font-bold text-white">{deal.conviction}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant={deal.dealScore >= 85 ? 'success' : deal.dealScore >= 70 ? 'warning' : 'danger'}>
              Deal score {deal.dealScore}
            </Badge>
            <Badge variant="default">Status {deal.status}</Badge>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-[200px_1fr]">
            <Select
              label="Update status"
              value={deal.status}
              onChange={async (event) => {
                const nextStatus = event.target.value;
                try {
                  await updateDealStatus(deal.id, nextStatus);
                  setDeal((current) => ({ ...current, status: nextStatus }));
                  toast.success('Status updated');
                } catch (updateError) {
                  toast.error(updateError?.message || 'Unable to update status');
                }
              }}
              options={[
                { label: 'Detected', value: 'detected' },
                { label: 'Matched', value: 'matched' },
                { label: 'Site Visit', value: 'site_visit' },
                { label: 'Negotiation', value: 'negotiation' },
                { label: 'Closed', value: 'closed' }
              ]}
            />

            <div>
              <p className="text-sm font-semibold">Buyer matching</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {buyers.slice(0, 8).map((buyer) => {
                  const active = selectedBuyerIds.includes(buyer.id);
                  return (
                    <button
                      key={buyer.id}
                      type="button"
                      className={`rounded-lg border px-3 py-2 text-left text-sm ${active ? 'border-primary-400 bg-primary-500/20 text-white' : 'border-surface-700 bg-surface-900 text-surface-200'}`}
                      onClick={() => {
                        setSelectedBuyerIds((current) =>
                          current.includes(buyer.id) ? current.filter((item) => item !== buyer.id) : [...current, buyer.id]
                        );
                      }}
                    >
                      <p className="font-semibold">{buyer.name}</p>
                      <p className="text-xs text-surface-400">{buyer.stage}</p>
                    </button>
                  );
                })}
              </div>
              <Button
                className="mt-3"
                onClick={async () => {
                  try {
                    await matchDealToBuyers(deal.id, selectedBuyerIds);
                    toast.success('Buyer mapping saved');
                  } catch (matchError) {
                    toast.error(matchError?.message || 'Unable to map buyers');
                  }
                }}
              >
                Save Buyer Matches
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-surface-900/60">
          <h2 className="text-lg font-semibold">Deal Timeline</h2>
          <ul className="mt-3 space-y-2 text-sm text-surface-300">
            <li className="rounded-lg border border-surface-700 bg-surface-900 px-3 py-2">
              Detected: {new Date(deal.detectedAt).toLocaleDateString('en-IN')}
            </li>
            <li className="rounded-lg border border-surface-700 bg-surface-900 px-3 py-2">Status: {deal.status}</li>
            <li className="rounded-lg border border-surface-700 bg-surface-900 px-3 py-2">Last reviewed: {new Date().toLocaleDateString('en-IN')}</li>
          </ul>
          <Link href="/deals" className="mt-4 inline-block text-sm font-semibold text-primary-300">
            Back to board
          </Link>
        </Card>
      </div>
    </section>
  );
}
