import React from 'react';
import { useOfflineStore } from '@/shared/stores/offlineStore';

export function PendingChangesIndicator({ className = '' }) {
  const pendingCount = useOfflineStore((state) => state.pendingActionsCount);

  if (pendingCount === 0) return null;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full ${className}`}>
      <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
      <span className="text-warning text-xs font-semibold">
        {pendingCount} pending change{pendingCount > 1 ? 's' : ''}
      </span>
    </div>
  );
}

export default PendingChangesIndicator;
