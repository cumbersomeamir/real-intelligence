/**
 * @file AI agents control center page.
 */

import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import AgentStatusGrid from '@/app/(dashboard)/ai-agents/components/AgentStatusGrid';
import AgentConfigPanel from '@/app/(dashboard)/ai-agents/components/AgentConfigPanel';
import AgentLogs from '@/app/(dashboard)/ai-agents/components/AgentLogs';
import AgentScheduler from '@/app/(dashboard)/ai-agents/components/AgentScheduler';
import FeedbackLoopViz from '@/app/(dashboard)/ai-agents/components/FeedbackLoopViz';
import AgentChat from '@/app/(dashboard)/ai-agents/components/AgentChat';
import { agentStatuses } from '@/lib/mockData';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for AI agents page.
 * @returns {Promise<import('next').Metadata>} Metadata.
 */
export async function generateMetadata() {
  return buildMetadata({ title: 'AI Agent Control Center', description: 'Monitor and configure autonomous platform agents.', path: '/ai-agents' });
}

/**
 * AI agents page.
 * @returns {JSX.Element} Agent control center.
 */
export default function AIAgentsPage() {
  return (
    <section className="space-y-6">
      <BreadcrumbNav items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'AI Agents' }]} />
      <h1 className="text-3xl font-extrabold">AI Agent Control Center</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <AgentStatusGrid items={agentStatuses.map((agent) => `${agent.name}: ${agent.status}`)} />
        <AgentConfigPanel items={agentStatuses.map((agent) => `${agent.name} schedule ${agent.schedule}`)} />
        <AgentScheduler items={agentStatuses.map((agent) => `Trigger ${agent.name}`)} />
        <FeedbackLoopViz items={['Outcomes logged', 'Strategy adjustments queued', 'Validation checks passed']} />
        <AgentLogs items={agentStatuses.map((agent) => `${agent.name} success rate ${agent.successRate}%`)} />
        <AgentChat items={['Manual trigger commands', 'Agent diagnostics']} />
      </div>
    </section>
  );
}
