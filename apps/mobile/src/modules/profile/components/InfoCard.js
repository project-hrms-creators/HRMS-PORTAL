import React from 'react';
import { View, Text } from 'react-native';

export function InfoCard({ title, children }) {
  return (
    <View className="bg-white rounded-2xl border border-border p-4 mb-4">
      <Text className="text-textPrimary font-semibold mb-3">{title}</Text>
      {children}
    </View>
  );
}
