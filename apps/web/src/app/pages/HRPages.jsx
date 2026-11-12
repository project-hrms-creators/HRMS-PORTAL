import React from 'react';
import { Card } from '@/shared/components/Card';
import { Users, Briefcase, FileText } from 'lucide-react';
import { Button } from '@/shared/components/Button';

export function HROverviewPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">HR Operations Overview</h1>
          <p className="text-textSecondary text-sm">Employee onboarding, lifecycles, and talent management metrics.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="!mb-0">
          <span className="text-xs font-semibold text-textSecondary uppercase">Active Headcount</span>
          <div className="mt-2 text-2xl font-bold text-textPrimary">142</div>
        </Card>
        <Card className="!mb-0">
          <span className="text-xs font-semibold text-textSecondary uppercase">Open Requisitions</span>
          <div className="mt-2 text-2xl font-bold text-primary">8</div>
        </Card>
        <Card className="!mb-0">
          <span className="text-xs font-semibold text-textSecondary uppercase">Onboarding This Month</span>
          <div className="mt-2 text-2xl font-bold text-success">4</div>
        </Card>
      </div>
    </div>
  );
}

export function HRTalentPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-textPrimary flex items-center gap-2">
        <Users size={22} className="text-primary" />
        Talent Acquisition Pipeline
      </h1>
      <Card>
        <p className="text-textSecondary text-sm">Review candidate pipelines, interview schedules, and hiring feedback.</p>
      </Card>
    </div>
  );
}

export function HRRequisitionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-textPrimary flex items-center gap-2">
          <FileText size={22} className="text-primary" />
          Job Requisitions
        </h1>
        <Button title="Create Requisition" variant="primary" />
      </div>
      <Card>
        <p className="text-textSecondary text-sm">Manage open job vacancies, approvals, and candidate postings.</p>
      </Card>
    </div>
  );
}
