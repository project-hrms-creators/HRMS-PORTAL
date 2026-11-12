import React from 'react';
import { useAuthStore } from '@/core/auth/authStore';
import UnauthorizedScreen from './UnauthorizedScreen';

export function ProtectedRoute({ children, fallback = <UnauthorizedScreen /> }) {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return fallback;
  }

  return children;
}
