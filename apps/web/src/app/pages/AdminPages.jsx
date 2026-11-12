import React from 'react';
import { Card } from '@/shared/components/Card';
import { StatusBadge } from '@/shared/components/StatusBadge';
import { Button } from '@/shared/components/Button';
import { Users, Shield, Database, Calendar } from 'lucide-react';

export function AdminAttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">Manage Workforce Attendance</h1>
          <p className="text-textSecondary text-sm">Review real-time employee clock-ins, exceptions, and anomalies.</p>
        </div>
        <Button title="Export Report" variant="secondary" />
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-textSecondary uppercase">
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Check In</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-surface">
                <td className="py-3 px-4 font-medium text-textPrimary">Aarav Patel</td>
                <td className="py-3 px-4 text-textSecondary">Engineering</td>
                <td className="py-3 px-4 text-textSecondary">09:02 AM</td>
                <td className="py-3 px-4"><StatusBadge status="PRESENT" /></td>
                <td className="py-3 px-4"><button className="text-primary text-xs font-semibold hover:underline">Edit</button></td>
              </tr>
              <tr className="hover:bg-surface">
                <td className="py-3 px-4 font-medium text-textPrimary">Rohan Gupta</td>
                <td className="py-3 px-4 text-textSecondary">Marketing</td>
                <td className="py-3 px-4 text-textSecondary">10:15 AM</td>
                <td className="py-3 px-4"><StatusBadge status="LATE" /></td>
                <td className="py-3 px-4"><button className="text-primary text-xs font-semibold hover:underline">Edit</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function AdminLeavePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">Leave Approval Requests</h1>
          <p className="text-textSecondary text-sm">Approve or reject pending workforce time-off requests.</p>
        </div>
      </div>
      <Card>
        <div className="divide-y divide-border">
          <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-textPrimary">Sneha Verma • 3 Days Annual Leave</p>
              <p className="text-xs text-textSecondary mt-0.5">Oct 28 - Oct 30 • "Attending conference"</p>
            </div>
            <div className="flex gap-2">
              <Button title="Reject" variant="outline" />
              <Button title="Approve" variant="primary" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function AdminIAMPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-textPrimary flex items-center gap-2">
        <Shield size={22} className="text-primary" />
        Identity & Access Management (IAM)
      </h1>
      <Card>
        <p className="text-textSecondary text-sm mb-4">Manage RBAC roles, user permission assignments, and security policies.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 border border-border rounded-xl bg-surface">
            <span className="font-semibold text-sm text-textPrimary block">EMPLOYEE Role</span>
            <span className="text-xs text-textSecondary">Default self-service access</span>
          </div>
          <div className="p-4 border border-border rounded-xl bg-surface">
            <span className="font-semibold text-sm text-textPrimary block">ADMIN Role</span>
            <span className="text-xs text-textSecondary">Full operational HR administration</span>
          </div>
          <div className="p-4 border border-border rounded-xl bg-surface">
            <span className="font-semibold text-sm text-textPrimary block">SUPER_ADMIN Role</span>
            <span className="text-xs text-textSecondary">Platform governance & settings</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function AdminMasterDataPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-textPrimary flex items-center gap-2">
        <Database size={22} className="text-primary" />
        Master Data Configuration
      </h1>
      <Card>
        <p className="text-textSecondary text-sm">Configure departments, designations, shifts, and holiday calendars.</p>
      </Card>
    </div>
  );
}
