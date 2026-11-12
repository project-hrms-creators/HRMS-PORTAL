import React from 'react';
import { User, Mail, Phone, MapPin, Building, ShieldCheck } from 'lucide-react';
import { Card } from '@/shared/components/Card';
import { Avatar } from '@/shared/components/Avatar';
import { StatusBadge } from '@/shared/components/StatusBadge';
import { useAuthStore } from '@/core/auth/authStore';

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-border rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <Avatar name={`${user?.firstName} ${user?.lastName}`} size={80} className="text-2xl" />
        <div className="text-center sm:text-left flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-2xl font-bold text-textPrimary">
              {user?.firstName} {user?.lastName}
            </h1>
            <StatusBadge status="ACTIVE" />
          </div>
          <p className="text-textSecondary text-sm mt-1">
            {user?.role || 'EMPLOYEE'} • Employee ID: <span className="font-semibold text-textPrimary">{user?.employeeId || 'EMP001'}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="!mb-0">
          <h2 className="text-base font-bold text-textPrimary mb-4 pb-2 border-b border-border flex items-center gap-2">
            <User size={18} className="text-primary" />
            Personal & Contact Information
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-textSecondary">Email Address</span>
              <span className="font-medium text-textPrimary">{user?.email || 'user@company.com'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-textSecondary">Phone Number</span>
              <span className="font-medium text-textPrimary">+1 (555) 019-2834</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-textSecondary">Work Location</span>
              <span className="font-medium text-textPrimary">Headquarters (Floor 4)</span>
            </div>
          </div>
        </Card>

        <Card className="!mb-0">
          <h2 className="text-base font-bold text-textPrimary mb-4 pb-2 border-b border-border flex items-center gap-2">
            <Building size={18} className="text-primary" />
            Employment & Organization
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-textSecondary">Department</span>
              <span className="font-medium text-textPrimary">Engineering</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-textSecondary">Designation</span>
              <span className="font-medium text-textPrimary">Senior Software Engineer</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-textSecondary">Employment Type</span>
              <span className="font-medium text-textPrimary">Full-time Regular</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
