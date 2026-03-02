/**
 * @file Reusable pie chart component.
 */

'use client';

import { PieChart as RePieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const colors = ['#1a3a8f', '#f5b800', '#10b981', '#ef4444', '#4a72ff'];

/**
 * Renders a pie chart.
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.data - Chart data.
 * @returns {JSX.Element} Pie chart.
 */
export default function PieChart({ data = [] }) {
  if (!data.length) return <div className="rounded-xl border border-dashed p-6 text-sm">No pie data available.</div>;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <RePieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={90}>
            {data.map((_, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
}
