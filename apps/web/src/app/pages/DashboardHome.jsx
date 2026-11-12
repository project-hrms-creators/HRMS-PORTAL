import React from 'react';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Megaphone,
  UserCheck
} from 'lucide-react';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { StatusBadge } from '@/shared/components/StatusBadge';
import { useAuthStore } from '@/core/auth/authStore';
import { mockData } from '@/tests/mocks/mockData';

export default function DashboardHome() {
  const user = useAuthStore((state) => state.user);
  const summary = mockData.dashboard.summary;
  const announcements = mockData.dashboard.announcements;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white border border-border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">
            Welcome back, {user?.firstName || 'Employee'}! 👋
          </h1>
          <p className="text-textSecondary text-sm mt-1">
            Role: <span className="font-semibold text-primary">{user?.role || 'EMPLOYEE'}</span> • Here is your HRMS overview today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            title="Clock In" 
            variant="primary" 
            icon={<Clock size={16} />}
            onClick={() => alert('Attendance check-in recorded successfully!')}
          />
          <Button 
            title="Apply Leave" 
            variant="secondary" 
            icon={<Calendar size={16} />}
            onClick={() => window.location.href = '/leave'}
          />
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="!mb-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-textSecondary">Attendance Status</span>
            <StatusBadge status={summary.attendance.status} />
          </div>
          <div className="text-2xl font-bold text-textPrimary">
            {summary.attendance.checkIn}
          </div>
          <p className="text-xs text-textSecondary mt-1">Check-in recorded</p>
        </Card>

        <Card className="!mb-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-textSecondary">Annual Leave</span>
            <Calendar size={16} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-textPrimary">
            {summary.leaveBalance.annual} <span className="text-sm font-normal text-textSecondary">days left</span>
          </div>
          <p className="text-xs text-textSecondary mt-1">Total entitlement: 18</p>
        </Card>

        <Card className="!mb-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-textSecondary">Sick Leave</span>
            <TrendingUp size={16} className="text-warning" />
          </div>
          <div className="text-2xl font-bold text-textPrimary">
            {summary.leaveBalance.sick} <span className="text-sm font-normal text-textSecondary">days left</span>
          </div>
          <p className="text-xs text-textSecondary mt-1">Total entitlement: 10</p>
        </Card>

        <Card className="!mb-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-textSecondary">Casual Leave</span>
            <UserCheck size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-textPrimary">
            {summary.leaveBalance.casual} <span className="text-sm font-normal text-textSecondary">days left</span>
          </div>
          <p className="text-xs text-textSecondary mt-1">Available to use</p>
        </Card>
      </div>

      {/* Announcements & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="!mb-0">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
            <div className="flex items-center gap-2">
              <Megaphone size={18} className="text-primary" />
              <h2 className="text-base font-bold text-textPrimary">Company Announcements</h2>
            </div>
          </div>
          <div className="divide-y divide-border">
            {announcements.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-textPrimary">{item.title}</p>
                  <p className="text-xs text-textSecondary mt-0.5">{new Date(item.date).toLocaleDateString()}</p>
                </div>
                <span className="text-xs px-2.5 py-1 bg-surface border border-border rounded-full font-medium text-textSecondary">
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="!mb-0">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-primary" />
              <h2 className="text-base font-bold text-textPrimary">Upcoming Holidays</h2>
            </div>
          </div>
          <div className="divide-y divide-border">
            {mockData.dashboard.holidays.map((h) => (
              <div key={h.id} className="py-3 flex items-center justify-between">
                <span className="text-sm font-medium text-textPrimary">{h.name}</span>
                <span className="text-xs font-semibold text-primary">{h.date}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
