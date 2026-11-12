import React, { useEffect, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/api/client/queryClient';
import { sessionManager } from '@/core/session/sessionManager';
import { networkMonitor } from '@/core/network/networkMonitor';
import { queueManager } from '@/core/offline/queueManager';
import { useAuthStore } from '@/core/auth/authStore';
import { useRbacStore } from '@/core/rbac/store/rbacStore';
import AppRouter from '@/app/routes/AppRouter';
import { LoadingOverlay } from '@/shared/components/LoadingOverlay';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function bootstrap() {
      // 1. Setup Axios interceptors
      sessionManager.setupInterceptors();

      // 2. Hydrate session from localStorage
      await sessionManager.initialize();

      // 3. Sync RBAC store with active user
      const user = useAuthStore.getState().user;
      if (user) {
        useRbacStore.getState().syncWithUser(user);
      }

      // 4. Initialize network and offline queues
      queueManager.initializeStore();
      networkMonitor.startMonitoring();

      setIsReady(true);
    }

    bootstrap();

    return () => {
      networkMonitor.stopMonitoring();
    };
  }, []);

  if (!isReady) {
    return <LoadingOverlay visible={true} message="Initializing WorkForce Portal..." />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
}
