import React from 'react';

export function Card({ children, className = '', style, onClick }) {
  const Component = onClick ? 'button' : 'div';
  return (
    <Component 
      onClick={onClick}
      className={`bg-white rounded-xl p-6 border border-border shadow-sm mb-4 block text-left w-full transition-shadow ${onClick ? 'hover:shadow-md cursor-pointer' : ''} ${className}`}
      style={style}
    >
      {children}
    </Component>
  );
}

export default Card;
