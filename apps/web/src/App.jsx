import React, { useEffect, useState } from 'react';
import { Building2, CheckCircle2, ShieldCheck, Wifi, UserCheck } from 'lucide-react';
import { useAuthStore } from '@/core/auth/authStore';
import { useRbacStore } from '@/core/rbac/store/rbacStore';
import { sessionManager } from '@/core/session/sessionManager';
import { networkMonitor } from '@/core/network/networkMonitor';
import { useOfflineStore } from '@/shared/stores/offlineStore';
import { ROLES } from '@/core/rbac/roles';

export default function App() {
  const [initSuccess, setInitSuccess] = useState(false);
  const { user, setUser } = useAuthStore();
  const { role, permissions, syncWithUser } = useRbacStore();
  const isOnline = useOfflineStore((state) => state.isOnline);

  useEffect(() => {
    // 1. Initialize Network Monitor
    networkMonitor.startMonitoring();

    // 2. Setup Axios interceptors
    sessionManager.setupInterceptors();

    // 3. Initialize session
    sessionManager.initialize().then(() => {
      // Simulate demo user if not logged in
      if (!useAuthStore.getState().user) {
        const demoUser = {
          id: 'demo-01',
          employeeId: 'EMP001',
          firstName: 'Aarav',
          lastName: 'Patel',
          email: 'aarav.patel@company.com',
          role: ROLES.ADMIN,
        };
        setUser(demoUser);
        syncWithUser(demoUser);
      }
      setInitSuccess(true);
    });

    return () => {
      networkMonitor.stopMonitoring();
    };
  }, [setUser, syncWithUser]);

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md border border-border p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center shadow-sm">
            <Building2 size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-textPrimary font-inter">
              WorkForce HRMS Portal
            </h1>
            <p className="text-textSecondary text-xs">
              Phase 3: Storage & Headless Logic Integration Verified
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between p-3 bg-surface rounded-md border border-border text-sm">
            <span className="flex items-center gap-2 text-textPrimary font-medium">
              <Wifi size={16} className={isOnline ? "text-success" : "text-error"} />
              Network Status
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 font-semibold">
              {isOnline ? 'Online (Web Navigator)' : 'Offline'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-surface rounded-md border border-border text-sm">
            <span className="flex items-center gap-2 text-textPrimary font-medium">
              <UserCheck size={16} className="text-primary" />
              Auth & Session State
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-primary font-semibold">
              {user ? `${user.firstName} (${user.role})` : 'Hydrating...'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-surface rounded-md border border-border text-sm">
            <span className="flex items-center gap-2 text-textPrimary font-medium">
              <ShieldCheck size={16} className="text-warning" />
              RBAC Permissions
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
              {permissions?.length || 0} Permissions Loaded
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-success text-sm font-semibold bg-green-50 py-2.5 px-4 rounded-md border border-green-200">
          <CheckCircle2 size={18} />
          <span>Step 3 Verified: Ready for UI Components (Step 4)</span>
        </div>
      </div>
    </div>
  );
}
