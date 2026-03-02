/**
 * @file Debounce hook for search/filter inputs.
 */

'use client';

import { useEffect, useState } from 'react';

/**
 * Debounces any changing value.
 * @template T
 * @param {T} value - Input value.
 * @param {number} delay - Delay in milliseconds.
 * @returns {T} Debounced value.
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
}
