/**
 * @file Reusable line chart component.
 */

'use client';

import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

/**
 * Renders a line chart.
 * @param {Object} props - Chart props.
 * @param {Array<Object>} props.data - Chart data points.
 * @param {string} [props.xKey] - X-axis key.
 * @param {string} [props.yKey] - Y-axis key.
 * @returns {JSX.Element} Line chart.
 */
export default function LineChart({ data = [], xKey = 'name', yKey = 'value' }) {
  if (!data.length) return <div className="rounded-xl border border-dashed p-6 text-sm">No trend data available.</div>;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <ReLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={yKey} stroke="#1a3a8f" strokeWidth={2} dot={false} />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
}
