import React from 'react';
import { Clock, Calendar, CheckCircle2, History } from 'lucide-react';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { StatusBadge } from '@/shared/components/StatusBadge';
import { mockData } from '@/tests/mocks/mockData';

export default function AttendancePage() {
  const history = mockData.attendance.history || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">My Attendance</h1>
          <p className="text-textSecondary text-sm">Track your daily punches and hours worked.</p>
        </div>
        <div className="flex gap-2">
          <Button title="Punch In / Out" variant="primary" icon={<Clock size={16} />} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="!mb-0">
          <span className="text-xs font-semibold text-textSecondary uppercase">Today's Punch Status</span>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-2xl font-bold text-textPrimary">09:12 AM</span>
            <StatusBadge status="PRESENT" />
          </div>
        </Card>
        <Card className="!mb-0">
          <span className="text-xs font-semibold text-textSecondary uppercase">Total Hours Logged</span>
          <div className="mt-2 text-2xl font-bold text-textPrimary">7h 45m</div>
        </Card>
        <Card className="!mb-0">
          <span className="text-xs font-semibold text-textSecondary uppercase">Monthly Average</span>
          <div className="mt-2 text-2xl font-bold text-success">8.2 hrs/day</div>
        </Card>
      </div>

      {/* Attendance History Table */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-textPrimary flex items-center gap-2">
            <History size={18} className="text-primary" />
            Attendance History (Recent Logs)
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-border text-xs font-semibold text-textSecondary uppercase">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Check In</th>
                <th className="py-3 px-4">Check Out</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {history.map((record) => (
                <tr key={record.id} className="hover:bg-surface transition-colors">
                  <td className="py-3 px-4 font-medium text-textPrimary">{record.date}</td>
                  <td className="py-3 px-4 text-textSecondary">{record.checkIn || '--:--'}</td>
                  <td className="py-3 px-4 text-textSecondary">{record.checkOut || '--:--'}</td>
                  <td className="py-3 px-4"><StatusBadge status={record.status} /></td>
                  <td className="py-3 px-4 text-textSecondary">{record.hoursWorked || 0} hrs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
