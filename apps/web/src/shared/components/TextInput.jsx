import React, { useState } from 'react';

export function TextInput({ 
  label, 
  error, 
  styleClass = '', 
  className = '',
  icon: Icon, 
  onFocus, 
  onBlur, 
  onChange,
  onChangeText,
  value,
  defaultValue,
  type = 'text',
  placeholder,
  ...props 
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleChange = (e) => {
    if (onChange) onChange(e);
    if (onChangeText) onChangeText(e.target.value);
  };

  let borderColorClass = 'border-border';
  if (error) {
    borderColorClass = 'border-error ring-1 ring-error';
  } else if (isFocused) {
    borderColorClass = 'border-primary ring-1 ring-primary shadow-sm';
  }

  const wrapperClass = [styleClass, className].filter(Boolean).join(' ');

  const renderIcon = () => {
    if (!Icon) return null;
    if (React.isValidElement(Icon)) {
      return Icon;
    }
    if (
      typeof Icon === 'function' ||
      (typeof Icon === 'object' && Icon !== null && ('$$typeof' in Icon || 'render' in Icon))
    ) {
      const IconComponent = Icon;
      return <IconComponent size={18} color={isFocused ? "#2563EB" : "#9CA3AF"} />;
    }
    return Icon;
  };

  return (
    <div className={`mb-5 w-full ${wrapperClass}`}>
      {label && (
        <label className="block text-textSecondary text-sm mb-1.5 font-inter font-medium">
          {label}
        </label>
      )}

      <div className={`h-11 border rounded-lg px-3.5 flex items-center bg-white transition-all duration-150 ${borderColorClass}`}>
        {Icon && (
          <div className="mr-2.5 text-gray-400 flex items-center justify-center">
            {renderIcon()}
          </div>
        )}
        <input
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="flex-1 w-full bg-transparent text-textPrimary text-sm font-inter focus:outline-none placeholder:text-gray-400"
          {...props}
        />
      </div>

      {error && (
        <p className="text-error text-xs mt-1.5 font-inter font-medium pl-0.5">
          {error}
        </p>
      )}
    </div>
  );
}

export default TextInput;
