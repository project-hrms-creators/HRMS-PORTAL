import React from 'react';

export function StatusBadge({ status, className = '' }) {
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-600';
  
  const statusStr = status?.toString().toUpperCase() || '';

  // Determine colors based on status content
  if (
    statusStr.includes('PRESENT') || 
    statusStr.includes('APPROVED') || 
    statusStr.includes('CLOCKED_IN') ||
    statusStr.includes('CLOCKED_OUT') ||
    statusStr.includes('ACTIVE')
  ) {
    bgColor = 'bg-green-100';
    textColor = 'text-success';
  } else if (
    statusStr.includes('LATE') || 
    statusStr.includes('PENDING') || 
    statusStr.includes('HALF')
  ) {
    bgColor = 'bg-amber-100';
    textColor = 'text-warning';
  } else if (
    statusStr.includes('ABSENT') || 
    statusStr.includes('REJECTED') ||
    statusStr.includes('INACTIVE')
  ) {
    bgColor = 'bg-red-100';
    textColor = 'text-error';
  } else if (
    statusStr.includes('LEAVE') || 
    statusStr.includes('HOLIDAY') || 
    statusStr.includes('WEEKEND')
  ) {
    bgColor = 'bg-blue-100';
    textColor = 'text-primary';
  }

  // Normalize status text for display
  const displayText = status ? String(status).replace(/_/g, ' ') : 'Unknown';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${bgColor} ${textColor} ${className}`}>
      {displayText}
    </span>
  );
}

export default StatusBadge;
