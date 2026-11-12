import React from 'react';

export function Divider({ className = '' }) {
  return <hr className={`border-0 border-t border-border w-full my-4 ${className}`} />;
}

export default Divider;
