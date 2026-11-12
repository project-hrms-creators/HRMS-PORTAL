import React from 'react';
import { AlertCircle } from 'lucide-react';

export function ErrorMessage({ message, styleClass = '', className = '' }) {
  if (!message) return null;
  const extraClasses = [styleClass, className].filter(Boolean).join(' ');

  return (
    <div className={`bg-red-50 border border-red-200 border-l-4 border-l-error px-4 py-3 rounded-lg mb-5 flex items-start gap-3 shadow-sm ${extraClasses}`}>
      <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
      <span className="text-error font-inter font-medium text-sm leading-tight">{message}</span>
    </div>
  );
}

export default ErrorMessage;
