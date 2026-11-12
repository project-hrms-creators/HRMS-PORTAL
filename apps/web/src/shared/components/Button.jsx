import React from 'react';
import { Loader2 } from 'lucide-react';

export function Button({ 
  onPress,
  onClick,
  title, 
  children,
  loading = false, 
  disabled = false, 
  variant = 'primary', 
  styleClass = '',
  className = '',
  textClass = '',
  icon = null,
  type = 'button',
  ...props
}) {
  const handleClick = (e) => {
    if (disabled || loading) return;
    if (onClick) onClick(e);
    if (onPress) onPress(e);
  };

  const isDisabled = disabled || loading;

  const baseClasses = "h-11 px-5 rounded-lg font-inter font-semibold text-sm inline-flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer disabled:cursor-not-allowed select-none";

  let variantClasses = "";
  if (variant === 'primary') {
    variantClasses = "bg-primary text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-primary shadow-sm disabled:bg-blue-400";
  } else if (variant === 'secondary') {
    variantClasses = "bg-surface text-textPrimary border border-border hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-300 disabled:opacity-50";
  } else if (variant === 'outline') {
    variantClasses = "bg-transparent text-primary border border-primary hover:bg-blue-50 active:bg-blue-100 focus:ring-primary disabled:opacity-50";
  } else if (variant === 'ghost') {
    variantClasses = "bg-transparent text-textPrimary hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-300 disabled:opacity-50";
  } else if (variant === 'danger') {
    variantClasses = "bg-error text-white hover:bg-red-700 active:bg-red-800 focus:ring-error shadow-sm disabled:bg-red-400";
  }

  const extraClasses = [styleClass, className].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isDisabled}
      className={`${baseClasses} ${variantClasses} ${extraClasses}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : icon ? (
        <span className="mr-2 inline-flex items-center">{icon}</span>
      ) : null}
      <span className={textClass}>{title || children}</span>
    </button>
  );
}

export default Button;
