import React from 'react';

const renderSlot = (element) => {
  if (!element) return null;
  if (React.isValidElement(element)) return element;
  if (
    typeof element === 'function' ||
    (typeof element === 'object' && element !== null && ('$$typeof' in element || 'render' in element))
  ) {
    const Component = element;
    return <Component size={18} />;
  }
  return element;
};

export function ListItem({ title, subtitle, leftElement, rightElement, onPress, onClick, destructive }) {
  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (onPress) onPress(e);
  };

  const isClickable = Boolean(onClick || onPress);
  const Component = isClickable ? 'button' : 'div';

  return (
    <Component 
      onClick={isClickable ? handleClick : undefined}
      className={`flex items-center py-3.5 px-4 border-b border-border bg-white w-full text-left transition-colors ${isClickable ? 'hover:bg-gray-50 cursor-pointer' : ''}`}
    >
      {leftElement && <div className="mr-3 shrink-0">{renderSlot(leftElement)}</div>}
      
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${destructive ? 'text-error' : 'text-textPrimary'}`}>
          {title}
        </p>
        {subtitle && (
          <p className="text-textSecondary text-xs mt-0.5 truncate">{subtitle}</p>
        )}
      </div>
      
      {rightElement && <div className="ml-3 shrink-0">{renderSlot(rightElement)}</div>}
    </Component>
  );
}

export default ListItem;
