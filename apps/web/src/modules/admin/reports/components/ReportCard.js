import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FileText, ChevronRight } from 'lucide-react-native';

export const ReportCard = ({ report, onPress }) => (
  <TouchableOpacity 
    className="bg-white p-4 rounded-xl shadow-sm border border-border mb-3 flex-row items-center justify-between"
    onPress={onPress}
  >
    <View className="flex-row items-center flex-1 pr-4">
      <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-3">
        <FileText size={20} color="#0EA5E9" />
      </View>
      <View className="flex-1">
        <Text className="text-textPrimary font-semibold" numberOfLines={1}>{report.title}</Text>
        <Text className="text-textSecondary text-xs mt-1" numberOfLines={2}>{report.description}</Text>
      </View>
    </View>
    <ChevronRight size={20} color="#CBD5E1" />
  </TouchableOpacity>
);
