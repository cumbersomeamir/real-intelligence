/**
 * @file Deal board Zustand store.
 */

import { create } from 'zustand';

/** Stores selected deals for comparison mode. */
export const useDealStore = create((set) => ({
  selectedDeals: [],
  toggleDeal: (id) =>
    set((state) => {
      const exists = state.selectedDeals.includes(id);
      return {
        selectedDeals: exists
          ? state.selectedDeals.filter((dealId) => dealId !== id)
          : [...state.selectedDeals, id].slice(-5)
      };
    }),
  clearDeals: () => set({ selectedDeals: [] })
}));
