import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingOverlay({ visible, message = "Loading..." }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center border border-border min-w-[160px]">
        <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
        <span className="text-textPrimary font-inter font-semibold text-sm">{message}</span>
      </div>
    </div>
  );
}

export default LoadingOverlay;
