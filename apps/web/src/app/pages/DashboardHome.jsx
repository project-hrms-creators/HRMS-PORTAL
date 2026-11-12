import React, { useEffect } from 'react';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Megaphone,
  UserCheck,
  RefreshCw,
  LogOut
} from 'lucide-react';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { StatusBadge } from '@/shared/components/StatusBadge';
import { useAuthStore } from '@/core/auth/authStore';
import { useDashboardStore } from '@/modules/employee/dashboard/store/dashboardStore';
import { useAttendanceStore } from '@/modules/employee/attendance/store/attendanceStore';
import { useNavigate } from 'react-router-dom';

export default function DashboardHome() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  
  const { summary, announcements, holidays, isLoading, isRefreshing, fetchDashboardData, refreshDashboardData } = useDashboardStore();
  const { currentStatus, todayRecord, fetchTodayAttendance, performCheckIn, performCheckOut } = useAttendanceStore();

  useEffect(() => {
    fetchDashboardData();
    fetchTodayAttendance();
  }, [fetchDashboardData, fetchTodayAttendance]);

  const isClockedIn = currentStatus === 'CLOCKED_IN';

  const handlePunchToggle = async () => {
    if (isClockedIn) {
      await performCheckOut();
    } else {
      await performCheckIn();
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome & Quick Action Banner */}
      <div className="bg-white border border-border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-textPrimary font-inter">
              Welcome back, {user?.firstName || 'Colleague'}! 👋
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-primary font-semibold uppercase">
              {user?.role || 'EMPLOYEE'}
            </span>
          </div>
          <p className="text-textSecondary text-sm mt-1">
            WorkForce HRMS • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            title={isRefreshing ? "Refreshing..." : "Refresh"}
            variant="secondary"
            icon={<RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />}
            onClick={() => refreshDashboardData()}
          />
          <Button 
            title={isClockedIn ? "Clock Out" : "Clock In"} 
            variant={isClockedIn ? "danger" : "primary"} 
            icon={<Clock size={16} />}
            onClick={handlePunchToggle}
          />
          <Button 
            title="Apply Leave" 
            variant="outline" 
            icon={<Calendar size={16} />}
            onClick={() => navigate('/leave')}
          />
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="!mb-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-textSecondary">Attendance Status</span>
            <StatusBadge status={currentStatus || summary?.attendance?.status || 'NOT_MARKED'} />
          </div>
          <div className="text-2xl font-bold text-textPrimary">
            {todayRecord?.checkIn || summary?.attendance?.checkIn || '--:--'}
          </div>
          <p className="text-xs text-textSecondary mt-1">
            {isClockedIn ? `Punched in • Working: ${todayRecord?.hoursWorked || 0} hrs` : 'Punch recorded'}
          </p>
        </Card>

        <Card className="!mb-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-textSecondary">Annual Leave</span>
            <Calendar size={16} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-textPrimary">
            {summary?.leaveBalance?.annual ?? 12} <span className="text-sm font-normal text-textSecondary">days left</span>
          </div>
          <p className="text-xs text-textSecondary mt-1">Entitlement: 18 days/year</p>
        </Card>

        <Card className="!mb-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-textSecondary">Sick Leave</span>
            <TrendingUp size={16} className="text-warning" />
          </div>
          <div className="text-2xl font-bold text-textPrimary">
            {summary?.leaveBalance?.sick ?? 5} <span className="text-sm font-normal text-textSecondary">days left</span>
          </div>
          <p className="text-xs text-textSecondary mt-1">Medical buffer</p>
        </Card>

        <Card className="!mb-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-textSecondary">Casual Leave</span>
            <UserCheck size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-textPrimary">
            {summary?.leaveBalance?.casual ?? 3} <span className="text-sm font-normal text-textSecondary">days left</span>
          </div>
          <p className="text-xs text-textSecondary mt-1">Available to use</p>
        </Card>
      </div>

      {/* Announcements & Holidays Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="!mb-0">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
            <div className="flex items-center gap-2">
              <Megaphone size={18} className="text-primary" />
              <h2 className="text-base font-bold text-textPrimary">Company Announcements</h2>
            </div>
          </div>
          <div className="divide-y divide-border">
            {(announcements || []).map((item) => (
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
            {(holidays || []).map((h) => (
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
