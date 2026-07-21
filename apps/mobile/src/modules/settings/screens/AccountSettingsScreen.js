import React from 'react';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSettings } from '../hooks/useSettings';
import { SettingsSection } from '../components/SettingsSection';
import { SettingsItem } from '../components/SettingsItem';

export default function AccountSettingsScreen() {
  const navigation = useNavigation();
  const { settings } = useSettings();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1 px-4 py-4">
        <Text className="mb-1 text-2xl font-semibold text-slate-900">Account Settings</Text>
        <Text className="mb-4 text-sm text-slate-500">Review and update your account-related preferences.</Text>

        <SettingsSection title="Account Overview">
          <SettingsItem title="Email" description={settings?.email || 'yourname@company.com'} />
          <SettingsItem title="Phone" description={settings?.phone || '+91 98765 43210'} />
          <SettingsItem title="Employee ID" description={settings?.employeeId || 'EMP00001'} />
        </SettingsSection>

        <SettingsSection title="Security Actions">
          <SettingsItem title="Change Password" description="Update your password securely." onPress={() => navigation.navigate('SecuritySettings')} />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}
