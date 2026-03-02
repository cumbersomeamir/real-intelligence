'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Skeleton from '@/components/ui/Skeleton';
import { formatINR } from '@/lib/formatters';
import { getBuyer, getDeals } from '@/lib/dataClient';

/**
 * Buyer detail client page.
 * @param {Object} props - Props.
 * @param {string} props.id - Buyer id.
 * @returns {JSX.Element}
 */
export default function BuyerDetailClient({ id }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [buyer, setBuyer] = useState(null);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');

      try {
        const item = await getBuyer(id);
        setBuyer(item);
        const dealItems = await getDeals({ minScore: 70 });
        setDeals(dealItems);
      } catch (loadError) {
        setError(loadError?.message || 'Unable to load buyer');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  const matches = useMemo(() => {
    if (!buyer) return [];
    return deals
      .filter((deal) => {
        const locationHit = buyer.preferredLocations.some((location) =>
          deal.microLocation.toLowerCase().includes(location.toLowerCase())
        );
        const budgetHit = deal.price >= buyer.budgetMin && deal.price <= buyer.budgetMax;
        return locationHit && budgetHit;
      })
      .slice(0, 6);
  }, [buyer, deals]);

  if (loading) {
    return (
      <section className="space-y-4">
        <Skeleton className="h-7 w-80" />
        <Skeleton className="h-40 w-full" />
      </section>
    );
  }

  if (!buyer) {
    return (
      <section className="space-y-4">
        <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Buyers', href: '/buyers' }, { label: id }]} />
        <Card>
          <p className="text-sm text-risk-400">{error || 'Buyer not found.'}</p>
          <Link href="/buyers" className="mt-3 inline-block text-sm font-semibold text-primary-300">
            Back to buyers
          </Link>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Buyers', href: '/buyers' }, { label: buyer.name }]} />
      <div>
        <h1 className="text-3xl font-extrabold">{buyer.name}</h1>
        <p className="mt-1 text-sm text-surface-400">{buyer.email || buyer.phone || 'No contact details'}</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="bg-surface-900/60 xl:col-span-2">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-surface-400">Lead stage</p>
              <p className="mt-1 text-lg font-semibold text-white">{buyer.stage}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-surface-400">Source</p>
              <p className="mt-1 text-lg font-semibold text-white">{buyer.source}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-surface-400">Budget range</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {formatINR(buyer.budgetMin)} - {formatINR(buyer.budgetMax)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-surface-400">Lead score</p>
              <p className="mt-1 text-lg font-semibold text-white">{buyer.score}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-surface-300">Preferred locations</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {buyer.preferredLocations.map((location) => (
                <Badge key={location} variant="default">
                  {location}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        <Card className="bg-surface-900/60">
          <h2 className="text-lg font-semibold">Match Summary</h2>
          <p className="mt-2 text-sm text-surface-300">{matches.length} live deals currently match this buyer profile.</p>
          <Link href="/deals" className="mt-3 inline-block text-sm font-semibold text-primary-300">
            Open deal board
          </Link>
        </Card>
      </div>

      <Card className="bg-surface-900/60">
        <h2 className="text-lg font-semibold">Matched Deals</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((deal) => (
            <Link key={deal.id} href={`/deals/${deal.id}`} className="rounded-lg border border-surface-700 bg-surface-900 p-3 hover:border-primary-400">
              <p className="font-semibold text-white">{deal.title}</p>
              <p className="text-xs text-surface-400">{deal.microLocation}</p>
              <p className="mt-1 text-sm text-white">{formatINR(deal.price)}</p>
              <p className="text-xs text-surface-400">Score {deal.dealScore}</p>
            </Link>
          ))}
          {!matches.length ? <p className="text-sm text-surface-400">No matching deals right now.</p> : null}
        </div>
      </Card>
    </section>
  );
}
