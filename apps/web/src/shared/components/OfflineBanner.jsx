import React from 'react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { WifiOff } from 'lucide-react';

export function OfflineBanner() {
  const { isOffline } = useNetworkStatus();

  if (!isOffline) return null;

  return (
    <div className="bg-warning text-white px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium z-50 w-full shadow-sm">
      <WifiOff size={16} />
      <span>No internet connection. Operating offline.</span>
    </div>
  );
}

export default OfflineBanner;
