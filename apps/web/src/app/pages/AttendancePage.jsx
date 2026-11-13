import React, { useEffect } from 'react';
import { Clock, Calendar, CheckCircle2, History, AlertCircle, RefreshCw } from 'lucide-react';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { StatusBadge } from '@/shared/components/StatusBadge';
import { useAttendanceStore } from '@/modules/employee/attendance/store/attendanceStore';

export default function AttendancePage() {
  const { 
    currentStatus, 
    todayRecord, 
    history, 
    isLoading, 
    error,
    fetchTodayAttendance, 
    fetchHistory,
    fetchAttendanceHistory, 
    performCheckIn, 
    performCheckOut 
  } = useAttendanceStore();

  const loadHistory = fetchAttendanceHistory || fetchHistory;

  useEffect(() => {
    if (fetchTodayAttendance) fetchTodayAttendance();
    if (loadHistory) loadHistory();
  }, [fetchTodayAttendance, loadHistory]);

  const isClockedIn = currentStatus === 'CLOCKED_IN';

  const handlePunch = async () => {
    if (isClockedIn) {
      await performCheckOut();
    } else {
      await performCheckIn();
    }
  };

  return (
    <div className="space-y-6 font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">My Attendance Tracker</h1>
          <p className="text-textSecondary text-sm">Monitor your work schedule, shifts, and daily biometric logs.</p>
        </div>
        <div className="flex gap-2">
          <Button
            title="Refresh Logs"
            variant="secondary"
            icon={<RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />}
            onClick={() => { fetchTodayAttendance?.(); loadHistory?.(); }}
          />
          <Button 
            title={isClockedIn ? "Clock Out" : "Clock In"} 
            variant={isClockedIn ? "danger" : "primary"} 
            loading={isLoading}
            icon={<Clock size={16} />}
            onClick={handlePunch}
          />
        </div>
      </div>

      {/* Today's Punch Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="!mb-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-textSecondary uppercase tracking-wider">Today's State</span>
            <StatusBadge status={currentStatus} />
          </div>
          <div className="mt-2 text-2xl font-bold text-textPrimary">
            {todayRecord?.checkIn || '--:--'}
          </div>
          <p className="text-xs text-textSecondary mt-1">First punch of the day</p>
        </Card>

        <Card className="!mb-0">
          <span className="text-xs font-semibold text-textSecondary uppercase tracking-wider">Clock Out Time</span>
          <div className="mt-2 text-2xl font-bold text-textPrimary">
            {todayRecord?.checkOut || '--:--'}
          </div>
          <p className="text-xs text-textSecondary mt-1">Evening departure time</p>
        </Card>

        <Card className="!mb-0">
          <span className="text-xs font-semibold text-textSecondary uppercase tracking-wider">Logged Hours</span>
          <div className="mt-2 text-2xl font-bold text-success">
            {todayRecord?.hoursWorked ? `${todayRecord.hoursWorked} hrs` : '0 hrs'}
          </div>
          <p className="text-xs text-textSecondary mt-1">Daily requirement: 8 hrs</p>
        </Card>
      </div>

      {/* Attendance History Table */}
      <Card>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
          <h2 className="text-base font-bold text-textPrimary flex items-center gap-2">
            <History size={18} className="text-primary" />
            Attendance History & Verification Logs
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-border text-xs font-semibold text-textSecondary uppercase tracking-wider">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Check In</th>
                <th className="py-3 px-4">Check Out</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Hours Logged</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {history && history.length > 0 ? (
                history.map((record) => (
                  <tr key={record.id || record.date} className="hover:bg-surface transition-colors">
                    <td className="py-3.5 px-4 font-medium text-textPrimary">{record.date}</td>
                    <td className="py-3.5 px-4 text-textSecondary">{record.checkIn || '--:--'}</td>
                    <td className="py-3.5 px-4 text-textSecondary">{record.checkOut || '--:--'}</td>
                    <td className="py-3.5 px-4"><StatusBadge status={record.status} /></td>
                    <td className="py-3.5 px-4 text-textSecondary font-medium">{record.hoursWorked || 0} hrs</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-textSecondary text-sm">
                    No attendance records found for this period.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
