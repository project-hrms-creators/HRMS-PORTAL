import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { TopHeader } from '@/shared/components/TopHeader';
import { KpiCard } from '../components/KpiCard';
import { ChartContainer } from '../components/ChartContainer';
import { useAnalytics } from '../hooks/useAnalytics';
import { LoadingOverlay } from '@/shared/components/LoadingOverlay';

export default function AnalyticsOverviewScreen() {
  const { analyticsSummary, isLoading, error } = useAnalytics();

  const kpis = analyticsSummary?.kpis || [];

  return (
    <View className="flex-1 bg-surface">
      <TopHeader title="Analytics Overview" showBack={true} />
      <LoadingOverlay visible={isLoading} />
      
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {error ? <Text className="text-error mb-4">{error}</Text> : null}
        
        <View className="flex-row justify-between mb-6">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.id} metric={kpi} />
          ))}
        </View>

        <ChartContainer title="Attendance Trends (Last 30 Days)" />
        <ChartContainer title="Leave Distribution by Department" />
      </ScrollView>
    </View>
  );
}
