import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin, Building, ShieldCheck, Edit3, Check } from 'lucide-react';
import { Card } from '@/shared/components/Card';
import { Avatar } from '@/shared/components/Avatar';
import { Button } from '@/shared/components/Button';
import { StatusBadge } from '@/shared/components/StatusBadge';
import { TextInput } from '@/shared/components/TextInput';
import { Modal } from '@/shared/components/Modal';
import { useAuthStore } from '@/core/auth/authStore';
import { useProfileStore } from '@/modules/employee/profile/store/profileStore';

export default function ProfilePage() {
  const authUser = useAuthStore((state) => state.user);
  const { 
    profile, 
    employmentDetails, 
    emergencyContacts, 
    isLoading, 
    fetchProfile, 
    fetchEmploymentDetails, 
    fetchEmergencyContacts, 
    updateProfile 
  } = useProfileStore();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [phone, setPhone] = useState('+1 (555) 019-2834');
  const [address, setAddress] = useState('452 Innovation Blvd, San Francisco, CA');

  useEffect(() => {
    fetchProfile();
    fetchEmploymentDetails();
    fetchEmergencyContacts();
  }, [fetchProfile, fetchEmploymentDetails, fetchEmergencyContacts]);

  const activeUser = profile || authUser;

  const handleSaveContactInfo = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ phone, address });
      setEditModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 font-inter">
      {/* Profile Header Card */}
      <div className="bg-white border border-border rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <Avatar 
          name={`${activeUser?.firstName} ${activeUser?.lastName}`} 
          size={84} 
          className="text-2xl shadow-sm" 
        />
        <div className="text-center sm:text-left flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-2xl font-bold text-textPrimary">
              {activeUser?.firstName} {activeUser?.lastName}
            </h1>
            <StatusBadge status="ACTIVE" />
          </div>
          <p className="text-textSecondary text-sm mt-1">
            {activeUser?.role || 'EMPLOYEE'} • Employee Code: <span className="font-semibold text-textPrimary">{activeUser?.employeeId || 'EMP00001'}</span>
          </p>
        </div>
        <Button 
          title="Edit Details" 
          variant="secondary" 
          icon={<Edit3 size={15} />}
          onClick={() => setEditModalOpen(true)}
        />
      </div>

      {/* Profile Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card className="!mb-0">
          <h2 className="text-base font-bold text-textPrimary mb-4 pb-2 border-b border-border flex items-center gap-2">
            <User size={18} className="text-primary" />
            Contact & Personal Details
          </h2>
          <div className="space-y-3.5 text-sm">
            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-textSecondary">Email Address</span>
              <span className="font-medium text-textPrimary">{activeUser?.email || 'aarav.patel@company.com'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-textSecondary">Phone Number</span>
              <span className="font-medium text-textPrimary">{phone}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-textSecondary">Residential Address</span>
              <span className="font-medium text-textPrimary text-right max-w-xs">{address}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-textSecondary">Joining Date</span>
              <span className="font-medium text-textPrimary">March 15, 2024</span>
            </div>
          </div>
        </Card>

        {/* Employment Information */}
        <Card className="!mb-0">
          <h2 className="text-base font-bold text-textPrimary mb-4 pb-2 border-b border-border flex items-center gap-2">
            <Building size={18} className="text-primary" />
            Employment & Work Profile
          </h2>
          <div className="space-y-3.5 text-sm">
            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-textSecondary">Department</span>
              <span className="font-medium text-textPrimary">{employmentDetails?.department || 'Engineering'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-textSecondary">Designation</span>
              <span className="font-medium text-textPrimary">{employmentDetails?.designation || 'Senior Software Engineer'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-textSecondary">Reporting Manager</span>
              <span className="font-medium text-textPrimary">{employmentDetails?.managerName || 'Diya Sharma (VP Eng)'}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-textSecondary">Shift Policy</span>
              <span className="font-medium text-textPrimary">Standard General (09:00 - 18:00)</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Edit Details Modal */}
      <Modal
        visible={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Update Contact Details"
      >
        <form onSubmit={handleSaveContactInfo} className="space-y-4">
          <TextInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            label="Address"
            value={address}
            onChangeText={setAddress}
          />
          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button title="Cancel" variant="secondary" onClick={() => setEditModalOpen(false)} />
            <Button title="Save Changes" type="submit" variant="primary" icon={<Check size={16} />} />
          </div>
        </form>
      </Modal>
    </div>
  );
}
