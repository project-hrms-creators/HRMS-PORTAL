import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, Bell, User as UserIcon } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { OfflineBanner } from '@/shared/components/OfflineBanner';
import { PendingChangesIndicator } from '@/shared/components/PendingChangesIndicator';
import { SyncIndicator } from '@/shared/components/SyncIndicator';
import { useAuthStore } from '@/core/auth/authStore';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-surface flex flex-col font-inter">
      <OfflineBanner />

      <div className="flex-1 flex overflow-hidden">
        {/* Responsive Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Content Wrapper */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Navigation Bar */}
          <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 sm:px-6 shrink-0 z-10 shadow-xs">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="p-2 -ml-2 text-textSecondary hover:text-textPrimary hover:bg-gray-100 rounded-lg lg:hidden"
                aria-label="Open navigation sidebar"
              >
                <Menu size={22} />
              </button>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-textPrimary text-base">
                  HRMS Dashboard
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <PendingChangesIndicator />
              <SyncIndicator />

              <button
                type="button"
                onClick={() => navigate('/notifications')}
                className="p-2 text-textSecondary hover:text-textPrimary hover:bg-gray-100 rounded-lg transition-colors relative"
                aria-label="Notifications"
              >
                <Bell size={20} />
                <span className="w-2 h-2 bg-error rounded-full absolute top-2 right-2 ring-2 ring-white" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-textSecondary"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
                  {user?.firstName ? user.firstName[0] : <UserIcon size={16} />}
                </div>
              </button>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
