/**
 * @file Generic filters Zustand store.
 */

import { create } from 'zustand';

/** Shared filter state for list pages. */
export const useFilterStore = create((set) => ({
  filters: {},
  updateFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value }
    })),
  resetFilters: () => set({ filters: {} })
}));
