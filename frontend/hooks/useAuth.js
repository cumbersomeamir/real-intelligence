/**
 * @file Auth helper hook backed by Zustand auth store.
 */

'use client';

import { useMemo } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';

/**
 * Returns current auth state and actions.
 * @returns {{user:any,isAuthenticated:boolean,login:Function,logout:Function}} Auth API.
 */
export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = Boolean(user);

  return useMemo(
    () => ({ user, isAuthenticated, login, logout }),
    [user, isAuthenticated, login, logout]
  );
}
