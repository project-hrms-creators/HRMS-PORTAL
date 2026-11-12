import React from 'react';

export function FormWrapper({ children, className = '', onSubmit }) {
  const Component = onSubmit ? 'form' : 'div';
  return (
    <Component 
      onSubmit={onSubmit}
      className={`w-full space-y-4 ${className}`}
    >
      {children}
    </Component>
  );
}

export default FormWrapper;
