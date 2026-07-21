import React, { useEffect } from 'react';
import { ScrollView, View, RefreshControl, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDashboardStore } from '../store/dashboardStore';
import { useAuthStore } from '@/modules/auth/store/authStore';
import { GreetingHeader } from '../components/GreetingHeader';
import { SummaryCard } from '../components/SummaryCard';
import { QuickActionCard } from '../components/QuickActionCard';
import { AnnouncementCard } from '../components/AnnouncementCard';
import { SectionHeader } from '../components/SectionHeader';
import { ErrorMessage } from '@/components/ErrorMessage';
import { LoadingOverlay } from '@/components/LoadingOverlay';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const user = useAuthStore((state) => state.user);
  const { 
    summary, 
    announcements, 
    isLoading, 
    isRefreshing, 
    error, 
    fetchDashboardData, 
    refreshDashboardData 
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading && !summary) {
    return (
      <View className="flex-1 bg-surface">
        <LoadingOverlay visible={true} />
      </View>
    );
  }

  return (
    <ScrollView 
      className="flex-1 bg-surface"
      refreshControl={
        <RefreshControl 
          refreshing={isRefreshing} 
          onRefresh={refreshDashboardData} 
          colors={["#2563EB"]}
        />
      }
    >
      <GreetingHeader user={user} />

      {error ? (
        <View className="px-4 mt-4">
          <ErrorMessage message={error} />
        </View>
      ) : null}

      <SectionHeader title="Overview" />
      <View className="flex-row px-4 justify-between">
        <SummaryCard title="Today's Attendance" data={summary?.attendance} type="attendance" />
        <SummaryCard title="Leave Balance" data={summary?.leaveBalance} type="leave" />
      </View>

      <SectionHeader title="Quick Actions" />
      <View className="flex-row px-4 justify-between">
        <QuickActionCard 
          title="Attendance" 
          iconName="time" 
          onPress={() => navigation.navigate('Attendance')} 
        />
        <QuickActionCard 
          title="Leave" 
          iconName="calendar" 
          onPress={() => navigation.navigate('Leave')} 
        />
        <QuickActionCard 
          title="Profile" 
          iconName="person" 
          onPress={() => navigation.navigate('Profile')} 
        />
      </View>

      <SectionHeader title="Recent Announcements" />
      <View className="px-4 pb-6">
        {announcements && announcements.length > 0 ? (
          announcements.map((item) => (
            <AnnouncementCard key={item.id} announcement={item} />
          ))
        ) : (
          <View className="items-center justify-center p-6 bg-white rounded-xl border border-border border-dashed">
            <Text className="text-textSecondary font-inter">No new announcements</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
