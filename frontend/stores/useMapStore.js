/**
 * @file Map Zustand store.
 */

import { create } from 'zustand';

/** Global map state. */
export const useMapStore = create((set) => ({
  selectedPropertyId: null,
  filters: {},
  setSelectedPropertyId: (selectedPropertyId) => set({ selectedPropertyId }),
  setFilters: (filters) => set({ filters })
}));
