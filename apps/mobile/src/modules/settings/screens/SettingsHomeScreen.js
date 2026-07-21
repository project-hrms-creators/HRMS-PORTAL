import React, { useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSettings } from '../hooks/useSettings';
import { SettingsSection } from '../components/SettingsSection';
import { SettingsItem } from '../components/SettingsItem';
import { ErrorMessage } from '@/components/ErrorMessage';
import { LoadingOverlay } from '@/components/LoadingOverlay';

export default function SettingsHomeScreen() {
  const navigation = useNavigation();
  const { settings, isLoading, error, fetchSettings } = useSettings();

  useEffect(() => {
    if (!settings) {
      fetchSettings();
    }
  }, [fetchSettings, settings]);

  if (isLoading && !settings) {
    return <LoadingOverlay visible message="Loading settings..." />;
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1 px-4 py-4">
        <Text className="mb-1 text-2xl font-semibold text-slate-900">Settings</Text>
        <Text className="mb-4 text-sm text-slate-500">Manage your account, privacy, notifications and app preferences.</Text>
        {error ? <ErrorMessage message={error} /> : null}

        <SettingsSection title="Account">
          <SettingsItem title="Account Settings" description="Review your account details and security status." onPress={() => navigation.navigate('AccountSettings')} />
          <SettingsItem title="Security Settings" description="Control passwords, sign-in and security options." onPress={() => navigation.navigate('SecuritySettings')} />
        </SettingsSection>

        <SettingsSection title="Preferences">
          <SettingsItem title="Notification Preferences" description="Choose how you receive updates." onPress={() => navigation.navigate('NotificationPreferences')} />
          <SettingsItem title="Privacy Settings" description="Control your visibility and privacy options." onPress={() => navigation.navigate('PrivacySettings')} />
          <SettingsItem title="Language & Theme" description="Set your language and preferred look." onPress={() => navigation.navigate('Preferences')} />
        </SettingsSection>

        <SettingsSection title="Support">
          <SettingsItem title="Help & Support" description="Need help? Contact the support team." onPress={() => navigation.navigate('HelpAndSupport')} />
          <SettingsItem title="About Application" description="Version, build and app details." onPress={() => navigation.navigate('AboutApplication')} />
        </SettingsSection>

        <SettingsSection title="Account Actions">
          <SettingsItem title="Logout" description="Sign out of your current session." onPress={() => navigation.navigate('LogoutConfirmation')} />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}
