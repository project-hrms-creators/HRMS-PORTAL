import { useOfflineStore } from '@/shared/stores/offlineStore';

let isMonitoring = false;
let onlineHandler = null;
let offlineHandler = null;

export const networkMonitor = {
  /**
   * Initializes browser network monitoring.
   */
  startMonitoring: () => {
    if (isMonitoring || typeof window === 'undefined') return;
    isMonitoring = true;

    // Initial check
    networkMonitor.checkNetworkStatus();

    onlineHandler = () => {
      useOfflineStore.getState().setOnlineStatus(true);
    };

    offlineHandler = () => {
      useOfflineStore.getState().setOnlineStatus(false);
    };

    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);
  },

  stopMonitoring: () => {
    if (!isMonitoring || typeof window === 'undefined') return;
    isMonitoring = false;

    if (onlineHandler) window.removeEventListener('online', onlineHandler);
    if (offlineHandler) window.removeEventListener('offline', offlineHandler);
  },

  checkNetworkStatus: () => {
    if (typeof window === 'undefined') return true;
    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    const currentStatus = useOfflineStore.getState().isOnline;

    if (isOnline !== currentStatus) {
      useOfflineStore.getState().setOnlineStatus(isOnline);
    }

    return isOnline;
  },
};
