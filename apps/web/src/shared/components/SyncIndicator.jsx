import React from 'react';
import { Loader2 } from 'lucide-react';
import { useOfflineStore } from '@/shared/stores/offlineStore';

export function SyncIndicator({ className = '' }) {
  const isSyncing = useOfflineStore((state) => state.isSyncing);

  if (!isSyncing) return null;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-border rounded-full ${className}`}>
      <Loader2 size={12} className="animate-spin text-primary" />
      <span className="text-textSecondary text-xs font-medium">Syncing...</span>
    </div>
  );
}

export default SyncIndicator;
