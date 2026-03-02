/**
 * @file Count-up animation component for KPI values.
 */

'use client';

import { useEffect, useState } from 'react';

/**
 * Animates integer counting from zero to target.
 * @param {Object} props - Component props.
 * @param {number} props.to - Target value.
 * @returns {JSX.Element} Animated value.
 */
export default function AnimatedCounter({ to = 0 }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.floor(to / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= to) {
        setValue(to);
        clearInterval(timer);
      } else {
        setValue(current);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [to]);

  return <span className="font-mono font-bold">{value.toLocaleString('en-IN')}</span>;
}
