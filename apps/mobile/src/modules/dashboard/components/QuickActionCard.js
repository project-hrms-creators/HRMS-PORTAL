import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

export function QuickActionCard({ title, onPress, iconName }) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="bg-white rounded-2xl p-4 shadow-sm border border-border items-center justify-center m-1 flex-1"
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Navigate to ${title}`}
    >
      <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center mb-2">
        {/* Placeholder for icon, e.g. <Ionicons name={iconName} size={24} color="#2563EB" /> */}
        <Text className="text-primary font-bold">{iconName ? iconName[0].toUpperCase() : title[0]}</Text>
      </View>
      <Text className="text-textPrimary text-sm font-semibold font-inter text-center">{title}</Text>
    </TouchableOpacity>
  );
}
