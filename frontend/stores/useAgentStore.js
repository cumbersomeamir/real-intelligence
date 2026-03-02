/**
 * @file AI agents Zustand store.
 */

import { create } from 'zustand';

/** Stores mutable agent configs and status. */
export const useAgentStore = create((set) => ({
  agents: {},
  setAgentConfig: (name, config) =>
    set((state) => ({
      agents: { ...state.agents, [name]: { ...(state.agents[name] || {}), ...config } }
    }))
}));
