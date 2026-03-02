/**
 * @file Reusable bar chart component.
 */

'use client';

import { BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Renders a vertical bar chart.
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.data - Input data.
 * @param {string} [props.xKey] - X key.
 * @param {string} [props.yKey] - Y key.
 * @returns {JSX.Element} Bar chart.
 */
export default function BarChart({ data = [], xKey = 'name', yKey = 'value' }) {
  if (!data.length) return <div className="rounded-xl border border-dashed p-6 text-sm">No bar data available.</div>;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <ReBarChart data={data}>
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={yKey} fill="#f5b800" radius={[6, 6, 0, 0]} />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
}
