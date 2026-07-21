import React from 'react';
import { View, Text } from 'react-native';

export function SummaryCard({ title, data, type }) {
  if (type === 'attendance') {
    return (
      <View className="bg-white rounded-2xl p-4 flex-1 shadow-sm border border-border mr-2">
        <Text className="text-textSecondary text-xs font-semibold uppercase tracking-wider mb-2 font-inter">{title}</Text>
        <Text className="text-textPrimary text-xl font-bold font-inter mb-1">{data?.status || 'N/A'}</Text>
        <Text className="text-textSecondary text-xs font-inter">In: {data?.checkIn || '--:--'} | Out: {data?.checkOut || '--:--'}</Text>
      </View>
    );
  }

  if (type === 'leave') {
    return (
      <View className="bg-white rounded-2xl p-4 flex-1 shadow-sm border border-border ml-2">
        <Text className="text-textSecondary text-xs font-semibold uppercase tracking-wider mb-2 font-inter">{title}</Text>
        <View className="flex-row justify-between mb-1">
          <Text className="text-textPrimary text-sm font-inter">Annual:</Text>
          <Text className="text-primary font-bold font-inter">{data?.annual || 0}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-textPrimary text-sm font-inter">Sick:</Text>
          <Text className="text-warning font-bold font-inter">{data?.sick || 0}</Text>
        </View>
      </View>
    );
  }

  return null;
}
