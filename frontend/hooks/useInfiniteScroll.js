/**
 * @file Infinite scroll hook based on IntersectionObserver.
 */

'use client';

import { useEffect, useRef } from 'react';

/**
 * Tracks a sentinel element and triggers callback when visible.
 * @param {Function} onIntersect - Callback invoked on intersection.
 * @returns {import('react').MutableRefObject<null>} Sentinel ref.
 */
export function useInfiniteScroll(onIntersect) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) onIntersect();
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onIntersect]);

  return ref;
}
