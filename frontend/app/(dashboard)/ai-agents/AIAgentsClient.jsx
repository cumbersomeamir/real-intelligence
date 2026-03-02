'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import { getAgents, triggerAgent, toggleAgent } from '@/lib/dataClient';

/**
 * AI agents client page.
 * @returns {JSX.Element}
 */
export default function AIAgentsClient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [agents, setAgents] = useState([]);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const items = await getAgents();
      setAgents(items);
    } catch (loadError) {
      setError(loadError?.message || 'Unable to load agents');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'AI Agents' }]} />
      <div>
        <h1 className="text-3xl font-extrabold">AI Agent Control Center</h1>
        <p className="mt-1 text-sm text-surface-400">Monitor health, trigger tasks, and pause/resume autonomous workflows.</p>
      </div>

      {error ? (
        <Card>
          <p className="text-sm text-risk-400">{error}</p>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(loading ? Array.from({ length: 8 }) : agents).map((agent, index) =>
          loading ? (
            <Card key={index} className="bg-surface-900/60">
              <Skeleton className="h-6 w-36" />
              <Skeleton className="mt-2 h-4 w-20" />
              <Skeleton className="mt-4 h-10 w-full" />
            </Card>
          ) : (
            <Card key={agent.name} className="bg-surface-900/60">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-semibold">{agent.name}</h2>
                <Badge variant={agent.status === 'running' || agent.status === 'idle' ? 'success' : 'warning'}>{agent.status}</Badge>
              </div>
              <p className="mt-2 text-sm text-surface-300">Schedule: {agent.schedule || 'manual'}</p>
              <p className="text-sm text-surface-300">Success rate: {agent.successRate || 0}%</p>
              <p className="text-sm text-surface-300">Avg duration: {agent.avgDurationMs || 0}ms</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  onClick={async () => {
                    try {
                      await triggerAgent(agent.name);
                      toast.success(`${agent.name} queued`);
                    } catch (triggerError) {
                      toast.error(triggerError?.message || 'Unable to trigger agent');
                    }
                  }}
                >
                  Trigger
                </Button>
                <Button
                  variant="ghost"
                  onClick={async () => {
                    const enabled = !(agent.status === 'paused');
                    try {
                      const nextEnabled = !enabled;
                      await toggleAgent(agent.name, nextEnabled);
                      setAgents((current) =>
                        current.map((item) =>
                          item.name === agent.name
                            ? { ...item, status: nextEnabled ? 'running' : 'paused' }
                            : item
                        )
                      );
                      toast.success(`${agent.name} ${nextEnabled ? 'resumed' : 'paused'}`);
                    } catch (toggleError) {
                      toast.error(toggleError?.message || 'Unable to toggle agent');
                    }
                  }}
                >
                  {agent.status === 'paused' ? 'Resume' : 'Pause'}
                </Button>
              </div>
            </Card>
          )
        )}
      </div>
    </section>
  );
}
