/**
 * @file Reusable area chart component.
 */

'use client';

import { AreaChart as ReAreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Renders an area chart.
 * @param {Object} props - Props.
 * @param {Array<Object>} props.data - Chart data.
 * @returns {JSX.Element} Area chart.
 */
export default function AreaChart({ data = [] }) {
  if (!data.length) return <div className="rounded-xl border border-dashed p-6 text-sm">No area data available.</div>;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <ReAreaChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" fill="#1a3a8f33" stroke="#1a3a8f" />
        </ReAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
