import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/core/rbac/guards/ProtectedRoute';
import { RoleGuard } from '@/core/rbac/guards/RoleGuard';
import { ROLES } from '@/core/rbac/roles';
import DashboardLayout from '@/app/layouts/DashboardLayout';
import Login from '@/modules/auth/Login';

// Pages
import DashboardHome from '@/app/pages/DashboardHome';
import AttendancePage from '@/app/pages/AttendancePage';
import LeavePage from '@/app/pages/LeavePage';
import ProfilePage from '@/app/pages/ProfilePage';
import { 
  AdminAttendancePage, 
  AdminLeavePage, 
  AdminIAMPage, 
  AdminMasterDataPage 
} from '@/app/pages/AdminPages';
import { 
  HROverviewPage, 
  HRTalentPage, 
  HRRequisitionsPage 
} from '@/app/pages/HRPages';
import { SettingsPage, NotFoundPage } from '@/app/pages/MiscPages';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Authenticated Dashboard Shell */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Default Redirect to Dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="leave" element={<LeavePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="notifications" element={<DashboardHome />} />

          {/* Admin Guarded Routes */}
          <Route
            path="admin/attendance"
            element={
              <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
                <AdminAttendancePage />
              </RoleGuard>
            }
          />
          <Route
            path="admin/leave"
            element={
              <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
                <AdminLeavePage />
              </RoleGuard>
            }
          />
          <Route
            path="admin/iam"
            element={
              <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
                <AdminIAMPage />
              </RoleGuard>
            }
          />
          <Route
            path="admin/master-data"
            element={
              <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
                <AdminMasterDataPage />
              </RoleGuard>
            }
          />

          {/* HR Guarded Routes */}
          <Route
            path="hr/overview"
            element={
              <RoleGuard allowedRoles={[ROLES.HR, ROLES.SUPER_ADMIN]}>
                <HROverviewPage />
              </RoleGuard>
            }
          />
          <Route
            path="hr/talent"
            element={
              <RoleGuard allowedRoles={[ROLES.HR, ROLES.SUPER_ADMIN]}>
                <HRTalentPage />
              </RoleGuard>
            }
          />
          <Route
            path="hr/requisitions"
            element={
              <RoleGuard allowedRoles={[ROLES.HR, ROLES.SUPER_ADMIN]}>
                <HRRequisitionsPage />
              </RoleGuard>
            }
          />

          {/* 404 Inside Dashboard */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
