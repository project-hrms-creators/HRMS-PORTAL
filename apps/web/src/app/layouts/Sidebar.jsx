import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Home, 
  Clock, 
  Calendar, 
  User, 
  Shield, 
  Settings, 
  Users, 
  FileText, 
  LogOut, 
  X,
  ChevronRight,
  Database
} from 'lucide-react';
import { useAuthStore } from '@/core/auth/authStore';
import { useRbacStore } from '@/core/rbac/store/rbacStore';
import { rbacService } from '@/core/rbac/services/rbacService';
import { ROLES } from '@/core/rbac/roles';

// Icon resolver helper for navigation items
const getNavIcon = (iconName) => {
  switch (iconName) {
    case 'home':
    case 'view-dashboard':
      return <Home size={18} />;
    case 'fingerprint':
    case 'clock-outline':
      return <Clock size={18} />;
    case 'calendar-days':
    case 'calendar-range':
      return <Calendar size={18} />;
    case 'user':
      return <User size={18} />;
    case 'shield':
    case 'shield-key-outline':
      return <Shield size={18} />;
    case 'briefcase-outline':
    case 'account-group-outline':
      return <Users size={18} />;
    case 'file-document-multiple-outline':
    case 'bullhorn-outline':
      return <FileText size={18} />;
    case 'database-settings':
      return <Database size={18} />;
    case 'settings':
      return <Settings size={18} />;
    default:
      return <ChevronRight size={16} />;
  }
};

// Route mapper for nav item names to URL paths
const getNavPath = (name) => {
  switch (name) {
    case 'Home':
    case 'AdminDashboard':
    case 'HRDashboard':
    case 'SuperAdminDashboard':
      return '/dashboard';
    case 'Attendance':
      return '/attendance';
    case 'Leave':
      return '/leave';
    case 'Profile':
      return '/profile';
    case 'AdminAttendance':
      return '/admin/attendance';
    case 'AdminLeave':
      return '/admin/leave';
    case 'AdminIAM':
      return '/admin/iam';
    case 'AdminMasterData':
      return '/admin/master-data';
    case 'HROverview':
      return '/hr/overview';
    case 'TalentDashboard':
      return '/hr/talent';
    case 'JobRequisitions':
      return '/hr/requisitions';
    case 'SystemSettings':
      return '/settings';
    default:
      return '/dashboard';
  }
};

export function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { user, logoutAction } = useAuthStore();
  const role = useRbacStore((state) => state.role) || user?.role || ROLES.EMPLOYEE;

  // Resolve navigation items dynamically based on active role
  const navItems = rbacService.resolveNavigation(role) || [];

  const handleLogout = () => {
    logoutAction();
    navigate('/login', { replace: true });
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-border flex flex-col transition-transform duration-200 ease-in-out
        lg:static lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center shadow-sm">
              <Building2 size={20} />
            </div>
            <div>
              <span className="font-bold text-lg text-textPrimary tracking-tight">WorkForce</span>
              <span className="block text-[10px] uppercase font-bold text-primary tracking-wider -mt-1">
                {role.replace('_', ' ')}
              </span>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="p-1 rounded-lg hover:bg-gray-100 lg:hidden text-textSecondary"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 mx-3 my-3 bg-surface rounded-xl border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-xs">
              {user?.firstName ? user.firstName[0] : 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-textPrimary truncate">
                {user ? `${user.firstName} ${user.lastName || ''}` : 'Employee User'}
              </p>
              <p className="text-xs text-textSecondary truncate">
                {user?.email || 'user@company.com'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-textSecondary mb-2">
            Main Navigation
          </p>
          {navItems.map((item) => {
            const path = getNavPath(item.name);
            return (
              <NavLink
                key={item.name}
                to={path}
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-blue-50 text-primary font-semibold' 
                    : 'text-textSecondary hover:text-textPrimary hover:bg-gray-100'
                  }
                `}
              >
                <span className="shrink-0">{getNavIcon(item.icon)}</span>
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Footer / Logout */}
        <div className="p-3 border-t border-border">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-error hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
