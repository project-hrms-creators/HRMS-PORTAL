import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { TopHeader } from '@/shared/components/TopHeader';
import { SavedReportCard } from '../components/SavedReportCard';
import { useSavedReports } from '../hooks/useSavedReports';
import { LoadingOverlay } from '@/shared/components/LoadingOverlay';

export default function SavedReportsScreen() {
  const { savedReports, isLoading, error } = useSavedReports();

  const mockSaved = savedReports.length > 0 ? savedReports : [
    { id: '1', name: 'IT Department August Leaves', created_at: '2026-08-01' },
    { id: '2', name: 'Q2 Headcount Report', created_at: '2026-07-15' },
  ];

  return (
    <View className="flex-1 bg-surface">
      <TopHeader title="Saved Reports" showBack={true} />
      <LoadingOverlay visible={isLoading} />
      
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {error ? <Text className="text-error mb-4">{error}</Text> : null}
        
        {mockSaved.map((report) => (
          <SavedReportCard key={report.id} savedReport={report} onPress={() => {}} />
        ))}
      </ScrollView>
    </View>
  );
}
