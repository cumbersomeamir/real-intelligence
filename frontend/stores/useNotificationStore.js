/**
 * @file Notification Zustand store.
 */

import { create } from 'zustand';

/** Maintains in-app notifications and read state. */
export const useNotificationStore = create((set) => ({
  notifications: [],
  push: (notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications].slice(0, 50) })),
  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((item) => ({ ...item, read: true }))
    }))
}));
