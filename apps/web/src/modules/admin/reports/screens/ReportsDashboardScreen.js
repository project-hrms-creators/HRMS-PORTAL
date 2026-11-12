import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { TopHeader } from '@/shared/components/TopHeader';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@/shared/components/Button';
import { BarChart2, Folder, Bookmark } from 'lucide-react-native';

export default function ReportsDashboardScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-surface">
      <TopHeader title="Reports & Analytics" showBack={true} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text className="text-textSecondary text-sm mb-4">
          Generate, view, and manage organizational analytics and reports.
        </Text>
        
        <View className="mb-4">
          <Button 
            title="Analytics Overview" 
            onPress={() => navigation.navigate('AnalyticsOverview')} 
            styleClass="bg-primary"
            icon={<BarChart2 size={20} color="white" />}
          />
        </View>

        <View className="mb-4">
          <Button 
            title="Report Explorer" 
            onPress={() => navigation.navigate('ReportExplorer')} 
            styleClass="bg-surface border border-border"
            textClass="text-textPrimary"
            icon={<Folder size={20} color="#0EA5E9" />}
          />
        </View>

        <View className="mb-4">
          <Button 
            title="Saved Reports" 
            onPress={() => navigation.navigate('SavedReports')} 
            styleClass="bg-surface border border-border"
            textClass="text-textPrimary"
            icon={<Bookmark size={20} color="#8B5CF6" />}
          />
        </View>
      </ScrollView>
    </View>
  );
}
