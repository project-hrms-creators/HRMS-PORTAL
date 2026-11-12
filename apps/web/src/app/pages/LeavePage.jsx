import React, { useState } from 'react';
import { Calendar, Plus, Clock } from 'lucide-react';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { StatusBadge } from '@/shared/components/StatusBadge';
import { Modal } from '@/shared/components/Modal';
import { TextInput } from '@/shared/components/TextInput';
import { mockData } from '@/tests/mocks/mockData';

export default function LeavePage() {
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const requests = mockData.leave.requests || [];
  const balance = mockData.leave.balance || {};

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">Leave Management</h1>
          <p className="text-textSecondary text-sm">View leave balances and submit time-off requests.</p>
        </div>
        <Button 
          title="Apply for Leave" 
          variant="primary" 
          icon={<Plus size={16} />}
          onClick={() => setApplyModalOpen(true)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="!mb-0">
          <span className="text-xs font-semibold text-textSecondary uppercase">Annual Leave Balance</span>
          <div className="mt-2 text-2xl font-bold text-textPrimary">{balance.annual || 12} Days</div>
        </Card>
        <Card className="!mb-0">
          <span className="text-xs font-semibold text-textSecondary uppercase">Sick Leave Balance</span>
          <div className="mt-2 text-2xl font-bold text-warning">{balance.sick || 5} Days</div>
        </Card>
        <Card className="!mb-0">
          <span className="text-xs font-semibold text-textSecondary uppercase">Casual Leave Balance</span>
          <div className="mt-2 text-2xl font-bold text-success">{balance.casual || 3} Days</div>
        </Card>
      </div>

      <Card>
        <h2 className="text-base font-bold text-textPrimary mb-4">Leave Application Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-border text-xs font-semibold text-textSecondary uppercase">
                <th className="py-3 px-4">Leave Type</th>
                <th className="py-3 px-4">From</th>
                <th className="py-3 px-4">To</th>
                <th className="py-3 px-4">Days</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {requests.map((r) => (
                <tr key={r.id} className="hover:bg-surface transition-colors">
                  <td className="py-3 px-4 font-medium text-textPrimary">{r.type}</td>
                  <td className="py-3 px-4 text-textSecondary">{r.startDate}</td>
                  <td className="py-3 px-4 text-textSecondary">{r.endDate}</td>
                  <td className="py-3 px-4 text-textSecondary">{r.days}</td>
                  <td className="py-3 px-4 text-textSecondary">{r.reason}</td>
                  <td className="py-3 px-4"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        visible={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        title="Apply for Leave"
      >
        <form onSubmit={(e) => { e.preventDefault(); alert('Leave request submitted!'); setApplyModalOpen(false); }} className="space-y-4">
          <TextInput label="Reason for Leave" placeholder="e.g. Family function" required />
          <div className="grid grid-cols-2 gap-3">
            <TextInput label="Start Date" type="date" required />
            <TextInput label="End Date" type="date" required />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button title="Cancel" variant="secondary" onClick={() => setApplyModalOpen(false)} />
            <Button title="Submit Application" type="submit" variant="primary" />
          </div>
        </form>
      </Modal>
    </div>
  );
}
