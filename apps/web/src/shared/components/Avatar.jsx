import React from 'react';
import { getInitials } from '@/shared/utils/stringUtils';

export function Avatar({ source, name, size = 40, className = '' }) {
  const sizeStyle = { width: size, height: size };

  // source can be an object with { uri } or a string URL
  const imgUrl = typeof source === 'object' && source?.uri ? source.uri : (typeof source === 'string' ? source : null);

  if (imgUrl) {
    return (
      <img 
        src={imgUrl} 
        alt={name || 'Avatar'}
        style={sizeStyle} 
        className={`rounded-full object-cover bg-gray-100 border border-border ${className}`} 
      />
    );
  }

  return (
    <div 
      style={sizeStyle} 
      className={`rounded-full bg-primary text-white flex items-center justify-center font-bold font-inter text-sm select-none ${className}`}
    >
      {getInitials(name)}
    </div>
  );
}

export default Avatar;
