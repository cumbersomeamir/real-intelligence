/**
 * @file Auth Zustand store.
 */

import { create } from 'zustand';

/**
 * Auth store with simple login/logout actions.
 */
export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  login: (payload) => set({ user: payload.user, token: payload.token }),
  logout: () => set({ user: null, token: null })
}));
