import React, { useState } from 'react';
import { 
  Building2, 
  Mail, 
  Lock, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Calendar,
  Clock
} from 'lucide-react';
import { Button } from '@/shared/components/Button';
import { TextInput } from '@/shared/components/TextInput';
import { PasswordInput } from '@/shared/components/PasswordInput';
import { Card } from '@/shared/components/Card';
import { StatusBadge } from '@/shared/components/StatusBadge';
import { Modal } from '@/shared/components/Modal';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { Avatar } from '@/shared/components/Avatar';
import { Divider } from '@/shared/components/Divider';
import { ListItem } from '@/shared/components/ListItem';
import { SectionHeader } from '@/shared/components/SectionHeader';
import { OfflineBanner } from '@/shared/components/OfflineBanner';
import { PendingChangesIndicator } from '@/shared/components/PendingChangesIndicator';
import { SyncIndicator } from '@/shared/components/SyncIndicator';
import { TopHeader } from '@/shared/components/TopHeader';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);

  const handleSimulateClick = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 1200);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-inter">
      <OfflineBanner />
      <TopHeader title="WorkForce HRMS" />

      <main className="flex-1 max-w-4xl w-full mx-auto p-6 space-y-6">
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h1 className="text-2xl font-bold text-textPrimary">UI Design System & Primitives</h1>
            <p className="text-textSecondary text-sm">Step 4 Complete: All 17 Shared Components Ported to React Web</p>
          </div>
          <div className="flex items-center gap-2">
            <PendingChangesIndicator />
            <SyncIndicator />
          </div>
        </div>

        {/* Status Badges */}
        <Card>
          <SectionHeader title="Status Badges" />
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="PRESENT" />
            <StatusBadge status="CLOCKED_IN" />
            <StatusBadge status="APPROVED" />
            <StatusBadge status="PENDING" />
            <StatusBadge status="LATE" />
            <StatusBadge status="ABSENT" />
            <StatusBadge status="REJECTED" />
            <StatusBadge status="ON_LEAVE" />
          </div>
        </Card>

        {/* Form Controls */}
        <Card>
          <SectionHeader title="Form Inputs & Validation" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Email Address"
              placeholder="e.g. employee@company.com"
              icon={Mail}
              value={email}
              onChangeText={setEmail}
            />
            <PasswordInput
              label="Password"
              placeholder="••••••••"
              icon={Lock}
              value={password}
              onChangeText={setPassword}
            />
          </div>
          <ErrorMessage message="Invalid credentials or network connection issue sample warning." />
        </Card>

        {/* Buttons & Actions */}
        <Card>
          <SectionHeader title="Buttons & Interactivity" />
          <div className="flex flex-wrap gap-3">
            <Button 
              title="Primary Action" 
              variant="primary" 
              loading={btnLoading}
              onClick={handleSimulateClick} 
            />
            <Button 
              title="Secondary Action" 
              variant="secondary" 
              onClick={() => setModalOpen(true)}
            />
            <Button 
              title="Outline Button" 
              variant="outline" 
            />
            <Button 
              title="Danger Button" 
              variant="danger" 
            />
          </div>
        </Card>

        {/* List Items & Avatars */}
        <Card>
          <SectionHeader title="List Items & Avatars" />
          <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
            <ListItem
              leftElement={<Avatar name="Aarav Patel" size={36} />}
              title="Aarav Patel"
              subtitle="Senior Software Engineer • Engineering"
              rightElement={<StatusBadge status="PRESENT" />}
            />
            <ListItem
              leftElement={<Avatar name="Diya Sharma" size={36} />}
              title="Diya Sharma"
              subtitle="Product Manager • Product Team"
              rightElement={<StatusBadge status="ON_LEAVE" />}
            />
          </div>
        </Card>

        {/* Modal Verification */}
        <Modal 
          visible={modalOpen} 
          onClose={() => setModalOpen(false)} 
          title="Shared Modal Verification"
        >
          <p className="text-textSecondary text-sm mb-4">
            This modal is built with web-standard keyboard (Escape) listeners, backdrop clicks, and clean scroll lock.
          </p>
          <div className="flex justify-end gap-2">
            <Button 
              title="Cancel" 
              variant="secondary" 
              onClick={() => setModalOpen(false)} 
            />
            <Button 
              title="Confirm Action" 
              variant="primary" 
              onClick={() => setModalOpen(false)} 
            />
          </div>
        </Modal>
      </main>
    </div>
  );
}
