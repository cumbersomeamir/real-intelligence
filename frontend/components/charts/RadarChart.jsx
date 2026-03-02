/**
 * @file Reusable radar chart component.
 */

'use client';

import {
  RadarChart as ReRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

/**
 * Renders a radar chart.
 * @param {Object} props - Props.
 * @param {Array<Object>} props.data - Radar data.
 * @returns {JSX.Element} Radar chart.
 */
export default function RadarChart({ data = [] }) {
  if (!data.length) return <div className="rounded-xl border border-dashed p-6 text-sm">No radar data available.</div>;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <ReRadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis />
          <Radar dataKey="value" stroke="#1a3a8f" fill="#1a3a8f66" />
        </ReRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
