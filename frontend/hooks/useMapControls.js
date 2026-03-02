/**
 * @file Map control state helper hook.
 */

'use client';

import { useState } from 'react';

/**
 * Manages map zoom and center values.
 * @returns {{zoom:number,center:number[],setZoom:Function,setCenter:Function}} Map controls.
 */
export function useMapControls() {
  const [zoom, setZoom] = useState(11);
  const [center, setCenter] = useState([80.9462, 26.8467]);
  return { zoom, center, setZoom, setCenter };
}
