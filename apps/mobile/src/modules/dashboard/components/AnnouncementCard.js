import React from 'react';
import { View, Text } from 'react-native';

export function AnnouncementCard({ announcement }) {
  return (
    <View className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-border">
      <View className="flex-row justify-between mb-2">
        <Text className="text-primary text-xs font-bold uppercase tracking-wider font-inter">
          {announcement.type}
        </Text>
        <Text className="text-textSecondary text-xs font-inter">{announcement.date}</Text>
      </View>
      <Text className="text-textPrimary text-base font-semibold font-inter">
        {announcement.title}
      </Text>
    </View>
  );
}
