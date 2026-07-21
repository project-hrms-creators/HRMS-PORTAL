import React, { useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../hooks/useProfile';
import { useEmploymentDetails } from '../hooks/useEmploymentDetails';
import { useDocuments } from '../hooks/useDocuments';
import { ProfileHeader } from '../components/ProfileHeader';
import { InfoCard } from '../components/InfoCard';
import { DetailRow } from '../components/DetailRow';
import { ErrorMessage } from '@/components/ErrorMessage';
import { LoadingOverlay } from '@/components/LoadingOverlay';

export default function ProfileHomeScreen() {
  const navigation = useNavigation();
  const { profile, isLoading, isRefreshing, error, refreshProfile } = useProfile();
  const { employmentDetails } = useEmploymentDetails();
  const { documents } = useDocuments();

  useEffect(() => {
    if (!profile) {
      refreshProfile();
    }
  }, [profile, refreshProfile]);

  if (isLoading && !profile) {
    return <LoadingOverlay visible message="Loading profile..." />;
  }

  return (
    <View className="flex-1 bg-surface">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshProfile} />}
      >
        <View className="p-4">
          <Text className="text-textPrimary text-3xl font-bold mb-2">Profile</Text>
          <Text className="text-textSecondary mb-4">View and manage your personal and employment details.</Text>
          {error ? <ErrorMessage message={error} /> : null}
          <ProfileHeader profile={profile} />

          <InfoCard title="Personal Information">
            <DetailRow label="Email" value={profile?.email} />
            <DetailRow label="Phone" value={profile?.phone} />
            <DetailRow label="Address" value={profile?.address} />
            <DetailRow label="Location" value={profile?.location} />
          </InfoCard>

          <InfoCard title="Employment Information">
            <DetailRow label="Employee ID" value={employmentDetails?.employeeId || profile?.employeeId} />
            <DetailRow label="Department" value={employmentDetails?.department || profile?.department} />
            <DetailRow label="Designation" value={employmentDetails?.designation || profile?.designation} />
            <DetailRow label="Manager" value={employmentDetails?.managerName || profile?.managerName} />
            <DetailRow label="Joining Date" value={employmentDetails?.joiningDate} />
          </InfoCard>

          <InfoCard title="Documents">
            {documents && documents.length > 0 ? (
              documents.map((document) => (
                <View key={document.id} className="py-2 border-b border-border last:border-0">
                  <Text className="text-textPrimary font-medium">{document.name}</Text>
                  <Text className="text-textSecondary text-sm">{document.type}</Text>
                </View>
              ))
            ) : (
              <Text className="text-textSecondary">No documents uploaded yet.</Text>
            )}
          </InfoCard>

          <View className="bg-white rounded-2xl border border-border p-4 mb-4">
            <Text className="text-textPrimary font-semibold mb-3">Quick Actions</Text>
            <TouchableOpacity className="bg-surface rounded-xl p-3 mb-2" onPress={() => navigation.navigate('EditProfile')}>
              <Text className="text-textPrimary font-medium">Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-surface rounded-xl p-3 mb-2" onPress={() => navigation.navigate('EmergencyContacts')}>
              <Text className="text-textPrimary font-medium">Emergency Contacts</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-surface rounded-xl p-3 mb-2" onPress={() => navigation.navigate('AccountInfo')}>
              <Text className="text-textPrimary font-medium">Account Information</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-surface rounded-xl p-3" onPress={() => navigation.navigate('ChangePassword')}>
              <Text className="text-textPrimary font-medium">Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
