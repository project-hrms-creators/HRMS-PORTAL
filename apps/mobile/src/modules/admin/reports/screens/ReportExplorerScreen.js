import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { TopHeader } from '@/shared/components/TopHeader';
import { ReportCard } from '../components/ReportCard';
import { useReports } from '../hooks/useReports';
import { LoadingOverlay } from '@/shared/components/LoadingOverlay';

export default function ReportExplorerScreen() {
  const { reports, isLoading, error } = useReports();

  const mockReports = reports.length > 0 ? reports : [
    { id: '1', title: 'Monthly Attendance Summary', description: 'Aggregated attendance data by department.' },
    { id: '2', title: 'Leave Balance Audit', description: 'Current leave balances across the entire organization.' },
    { id: '3', title: 'Employee Attrition Rate', description: 'Turnover statistics for the current fiscal year.' },
  ];

  return (
    <View className="flex-1 bg-surface">
      <TopHeader title="Report Explorer" showBack={true} />
      <LoadingOverlay visible={isLoading} />
      
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {error ? <Text className="text-error mb-4">{error}</Text> : null}
        
        {mockReports.map((report) => (
          <ReportCard key={report.id} report={report} onPress={() => {}} />
        ))}
      </ScrollView>
    </View>
  );
}
