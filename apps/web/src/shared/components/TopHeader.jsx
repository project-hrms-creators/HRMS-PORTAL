import React from 'react';
import { Bell, ArrowLeft, User as UserIcon, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/core/auth/authStore';

export function TopHeader({ title, showBack = false, className = '' }) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <header className={`flex items-center justify-between px-6 py-3.5 bg-white border-b border-border shadow-xs sticky top-0 z-30 ${className}`}>
      <div className="flex items-center gap-3">
        {showBack ? (
          <button 
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="p-1.5 -ml-1 text-textPrimary hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        ) : (
          <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
            <Building2 size={18} />
          </div>
        )}
        <h1 className={`${title ? 'text-textPrimary text-base font-semibold' : 'text-primary text-lg font-bold'} font-inter tracking-tight`}>
          {title || "WorkForce"}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button 
          type="button"
          onClick={() => navigate('/notifications')}
          aria-label="Notifications"
          className="p-2 text-textSecondary hover:text-textPrimary hover:bg-gray-100 rounded-lg transition-colors relative"
        >
          <Bell size={20} />
          <span className="w-2 h-2 bg-error rounded-full absolute top-2 right-2 ring-2 ring-white" />
        </button>

        <button 
          type="button"
          onClick={() => navigate('/profile')}
          aria-label="Profile"
          className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-textSecondary hover:text-textPrimary"
        >
          <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
            {user?.firstName ? user.firstName[0] : <UserIcon size={14} />}
          </div>
          {user && (
            <span className="text-xs font-medium text-textPrimary hidden md:inline">
              {user.firstName} {user.lastName}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

export default TopHeader;
