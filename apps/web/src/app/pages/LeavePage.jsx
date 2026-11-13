import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Plus, Clock, RefreshCw, XCircle } from 'lucide-react';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { StatusBadge } from '@/shared/components/StatusBadge';
import { Modal } from '@/shared/components/Modal';
import { TextInput } from '@/shared/components/TextInput';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { useLeaveStore } from '@/modules/employee/leave/store/leaveStore';
import { leaveApplicationSchema } from '@/modules/employee/leave/validation/leaveSchema';

export default function LeavePage() {
  const [modalOpen, setModalOpen] = useState(false);

  const { 
    balance, 
    history, 
    leaveTypes, 
    isLoading, 
    isSubmitting, 
    error,
    fetchLeaveBalance, 
    fetchLeaveHistory, 
    fetchLeaveTypes, 
    applyLeave,
    submitLeaveRequest = applyLeave, 
    cancelLeave,
    cancelLeaveRequest = cancelLeave,
    clearError 
  } = useLeaveStore();

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(leaveApplicationSchema),
    defaultValues: {
      leaveType: 'ANNUAL',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      halfDay: false,
      reason: '',
    },
  });

  useEffect(() => {
    fetchLeaveBalance();
    fetchLeaveHistory();
    fetchLeaveTypes();
  }, [fetchLeaveBalance, fetchLeaveHistory, fetchLeaveTypes]);

  const onSubmit = async (data) => {
    try {
      await submitLeaveRequest(data);
      reset();
      setModalOpen(false);
      await fetchLeaveBalance();
      await fetchLeaveHistory();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelRequest = async (id) => {
    if (window.confirm('Are you sure you want to cancel this leave application?')) {
      await cancelLeaveRequest(id);
      await fetchLeaveHistory();
      await fetchLeaveBalance();
    }
  };

  return (
    <div className="space-y-6 font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">Leave Applications & Balances</h1>
          <p className="text-textSecondary text-sm">Review accrued leave allowances and apply for upcoming time-off.</p>
        </div>
        <div className="flex gap-2">
          <Button
            title="Refresh"
            variant="secondary"
            icon={<RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />}
            onClick={() => { fetchLeaveBalance(); fetchLeaveHistory(); }}
          />
          <Button 
            title="Apply for Leave" 
            variant="primary" 
            icon={<Plus size={16} />}
            onClick={() => { clearError(); setModalOpen(true); }}
          />
        </div>
      </div>

      {/* Balance Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="!mb-0">
          <span className="text-xs font-semibold text-textSecondary uppercase tracking-wider">Annual Leave Balance</span>
          <div className="mt-2 text-2xl font-bold text-textPrimary">
            {balance?.annual ?? 12} <span className="text-sm font-normal text-textSecondary">days</span>
          </div>
          <p className="text-xs text-textSecondary mt-1">Paid vacation days</p>
        </Card>

        <Card className="!mb-0">
          <span className="text-xs font-semibold text-textSecondary uppercase tracking-wider">Sick Leave Balance</span>
          <div className="mt-2 text-2xl font-bold text-warning">
            {balance?.sick ?? 5} <span className="text-sm font-normal text-textSecondary">days</span>
          </div>
          <p className="text-xs text-textSecondary mt-1">Medical leaves</p>
        </Card>

        <Card className="!mb-0">
          <span className="text-xs font-semibold text-textSecondary uppercase tracking-wider">Casual Leave Balance</span>
          <div className="mt-2 text-2xl font-bold text-success">
            {balance?.casual ?? 3} <span className="text-sm font-normal text-textSecondary">days</span>
          </div>
          <p className="text-xs text-textSecondary mt-1">Personal days</p>
        </Card>
      </div>

      {/* Leave Application History Table */}
      <Card>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
          <h2 className="text-base font-bold text-textPrimary">My Leave Requests</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-border text-xs font-semibold text-textSecondary uppercase tracking-wider">
                <th className="py-3 px-4">Leave Type</th>
                <th className="py-3 px-4">Dates</th>
                <th className="py-3 px-4">Days</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {history && history.length > 0 ? (
                history.map((req) => (
                  <tr key={req.id} className="hover:bg-surface transition-colors">
                    <td className="py-3.5 px-4 font-medium text-textPrimary">{req.type || req.leaveType}</td>
                    <td className="py-3.5 px-4 text-textSecondary text-xs">
                      {req.startDate} → {req.endDate}
                    </td>
                    <td className="py-3.5 px-4 text-textSecondary">{req.days || 1} day(s)</td>
                    <td className="py-3.5 px-4 text-textSecondary max-w-xs truncate">{req.reason}</td>
                    <td className="py-3.5 px-4"><StatusBadge status={req.status} /></td>
                    <td className="py-3.5 px-4 text-right">
                      {req.status === 'PENDING' && (
                        <button
                          type="button"
                          onClick={() => handleCancelRequest(req.id)}
                          className="text-xs text-error hover:underline font-semibold"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-textSecondary text-sm">
                    No leave requests on record.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal: Apply for Leave */}
      <Modal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Submit Leave Application"
      >
        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={control}
            name="leaveType"
            render={({ field: { onChange, value } }) => (
              <div>
                <label className="block text-textSecondary text-sm mb-1.5 font-medium">Leave Type</label>
                <select
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full h-11 border border-border rounded-lg px-3 bg-white text-sm text-textPrimary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="ANNUAL">Annual Leave (Vacation)</option>
                  <option value="SICK">Sick Leave</option>
                  <option value="CASUAL">Casual Leave</option>
                  <option value="UNPAID">Unpaid Leave</option>
                </select>
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-3">
            <Controller
              control={control}
              name="startDate"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  type="date"
                  label="Start Date"
                  value={value}
                  onChangeText={onChange}
                  error={errors.startDate?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="endDate"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  type="date"
                  label="End Date"
                  value={value}
                  onChangeText={onChange}
                  error={errors.endDate?.message}
                />
              )}
            />
          </div>

          <Controller
            control={control}
            name="reason"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Reason / Remarks"
                placeholder="Brief reason for your time-off request..."
                value={value}
                onChangeText={onChange}
                error={errors.reason?.message}
              />
            )}
          />

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button 
              title="Cancel" 
              variant="secondary" 
              onClick={() => setModalOpen(false)} 
            />
            <Button 
              type="submit" 
              title="Submit Request" 
              loading={isSubmitting} 
              variant="primary" 
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
