import React from 'react';

export function SectionHeader({ title, onAction, actionTitle, className = '' }) {
  return (
    <div className={`flex justify-between items-end pb-2 mb-4 border-b border-border ${className}`}>
      <h2 className="text-textPrimary text-lg font-bold font-inter tracking-tight">{title}</h2>
      {onAction && actionTitle && (
        <button 
          type="button"
          onClick={onAction} 
          className="text-primary text-xs font-semibold hover:underline cursor-pointer focus:outline-none"
        >
          {actionTitle}
        </button>
      )}
    </div>
  );
}

export default SectionHeader;
