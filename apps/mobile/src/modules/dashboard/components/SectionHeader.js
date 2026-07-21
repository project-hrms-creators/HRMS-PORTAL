import React from 'react';
import { View, Text } from 'react-native';

export function SectionHeader({ title }) {
  return (
    <View className="flex-row justify-between items-center px-4 mt-6 mb-3">
      <Text className="text-textPrimary text-lg font-bold font-inter">{title}</Text>
    </View>
  );
}
