import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Bookmark, Clock } from 'lucide-react-native';

export const SavedReportCard = ({ savedReport, onPress }) => (
  <TouchableOpacity 
    className="bg-white p-4 rounded-xl shadow-sm border border-border mb-3 flex-row items-center"
    onPress={onPress}
  >
    <View className="w-10 h-10 bg-secondary/10 rounded-full items-center justify-center mr-3">
      <Bookmark size={20} color="#8B5CF6" />
    </View>
    <View className="flex-1">
      <Text className="text-textPrimary font-semibold">{savedReport.name}</Text>
      <View className="flex-row items-center mt-1">
        <Clock size={12} color="#64748B" />
        <Text className="text-textSecondary text-xs ml-1">Generated: {savedReport.created_at}</Text>
      </View>
    </View>
  </TouchableOpacity>
);
