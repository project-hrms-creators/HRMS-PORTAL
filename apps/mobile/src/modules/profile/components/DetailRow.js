import React from 'react';
import { View, Text } from 'react-native';

export function DetailRow({ label, value }) {
  return (
    <View className="flex-row justify-between py-2 border-b border-border last:border-0">
      <Text className="text-textSecondary flex-1">{label}</Text>
      <Text className="text-textPrimary flex-1 text-right">{value || '—'}</Text>
    </View>
  );
}
