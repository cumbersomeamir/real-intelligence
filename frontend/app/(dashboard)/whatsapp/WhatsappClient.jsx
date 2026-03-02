'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import { broadcastWhatsApp, getWhatsAppSummary, sendWhatsApp } from '@/lib/dataClient';

/**
 * WhatsApp dashboard client page.
 * @returns {JSX.Element}
 */
export default function WhatsappClient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState({ templates: [], stats: {}, messages: [] });
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [broadcast, setBroadcast] = useState('');

  async function load() {
    setLoading(true);
    setError('');
    try {
      setSummary(await getWhatsAppSummary());
    } catch (loadError) {
      setError(loadError?.message || 'Unable to load WhatsApp data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const templateOptions = useMemo(() => summary.templates || [], [summary.templates]);

  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'WhatsApp' }]} />
      <div>
        <h1 className="text-3xl font-extrabold">WhatsApp Management</h1>
        <p className="mt-1 text-sm text-surface-400">Template library, campaign sends, and delivery telemetry.</p>
      </div>

      {error ? (
        <Card>
          <p className="text-sm text-risk-400">{error}</p>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        {(loading
          ? Array.from({ length: 3 })
          : [
              { label: 'Delivered %', value: summary.stats.delivered || 0 },
              { label: 'Read %', value: summary.stats.read || 0 },
              { label: 'Failed %', value: summary.stats.failed || 0 }
            ]
        ).map((item, index) => (
          <Card key={item?.label || index} className="bg-surface-900/60">
            {loading ? (
              <>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-3 h-8 w-20" />
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
          <h2 className="text-lg font-semibold">Send Single Message</h2>
          <div className="mt-3 space-y-3">
            <Input label="Recipient" value={recipient} onChange={(event) => setRecipient(event.target.value)} placeholder="+91XXXXXXXXXX" />
            <Input label="Message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Type message" />
            <Button
              onClick={async () => {
                try {
                  await sendWhatsApp({ recipient, body: message, template: 'custom' });
                  toast.success('Message queued');
                  setRecipient('');
                  setMessage('');
                  load();
                } catch (sendError) {
                  toast.error(sendError?.message || 'Unable to send message');
                }
              }}
            >
              Send Message
            </Button>
          </div>
        </Card>

        <Card className="bg-surface-900/60">
          <h2 className="text-lg font-semibold">Broadcast</h2>
          <p className="mt-2 text-xs text-surface-400">Comma-separated recipients.</p>
          <div className="mt-3 space-y-3">
            <Input
              label="Recipients"
              value={broadcast}
              onChange={(event) => setBroadcast(event.target.value)}
              placeholder="+9199..., +9198..."
            />
            <Button
              onClick={async () => {
                const recipients = broadcast
                  .split(',')
                  .map((item) => item.trim())
                  .filter(Boolean);

                if (!recipients.length) {
                  toast.error('Add at least one recipient');
                  return;
                }

                try {
                  await broadcastWhatsApp({ recipients, body: message || 'Deal alert', template: 'deal_alert' });
                  toast.success(`Broadcast queued for ${recipients.length} contacts`);
                  setBroadcast('');
                  load();
                } catch (broadcastError) {
                  toast.error(broadcastError?.message || 'Unable to queue broadcast');
                }
              }}
            >
              Queue Broadcast
            </Button>
          </div>
        </Card>
      </div>

      <Card className="bg-surface-900/60">
        <h2 className="text-lg font-semibold">Templates</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {templateOptions.map((item) => (
            <article key={item.id} className="rounded-lg border border-surface-700 bg-surface-900 p-3">
              <p className="font-semibold text-white">{item.name}</p>
              <p className="mt-1 text-sm text-surface-300">{item.body}</p>
            </article>
          ))}
        </div>
      </Card>

      <Card className="bg-surface-900/60">
        <h2 className="text-lg font-semibold">Recent Message Queue</h2>
        <div className="mt-3 space-y-2 text-sm text-surface-300">
          {(summary.messages || []).slice(0, 8).map((item) => (
            <div key={item.id} className="rounded-lg border border-surface-700 bg-surface-900 px-3 py-2">
              {item.recipient} · {item.status} · {new Date(item.createdAt).toLocaleString('en-IN')}
            </div>
          ))}
          {!summary.messages?.length ? <p className="text-surface-400">No queued messages yet.</p> : null}
        </div>
      </Card>
    </section>
  );
}
