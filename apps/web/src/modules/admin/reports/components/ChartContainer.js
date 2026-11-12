import React from 'react';
import { View, Text } from 'react-native';

export const ChartContainer = ({ title, children }) => (
  <View className="bg-white p-4 rounded-xl shadow-sm border border-border mb-4">
    {title && <Text className="text-textPrimary font-semibold mb-4">{title}</Text>}
    <View className="items-center justify-center min-h-[200px]">
      {children || <Text className="text-textSecondary italic">Chart visualization placeholder</Text>}
    </View>
  </View>
);
