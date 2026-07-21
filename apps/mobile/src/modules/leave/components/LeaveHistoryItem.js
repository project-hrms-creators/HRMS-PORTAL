import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LeaveStatusBadge } from './LeaveStatusBadge';

export function LeaveHistoryItem({ item, onPress }) {
  const startDate = new Date(item.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endDate = new Date(item.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <TouchableOpacity onPress={onPress} className="bg-white border border-border rounded-2xl p-4 mb-3">
      <View className="flex-row justify-between items-start">
        <View className="flex-1 pr-3">
          <Text className="text-textPrimary font-semibold text-base">{item.leaveType}</Text>
          <Text className="text-textSecondary text-sm mt-1">{startDate} - {endDate}</Text>
          <Text className="text-textSecondary text-sm mt-1">{item.reason}</Text>
        </View>
        <LeaveStatusBadge status={item.status} />
      </View>
      <View className="flex-row justify-between items-center mt-3">
        <Text className="text-textSecondary text-xs">{item.duration} day(s)</Text>
        <Text className="text-primary text-sm font-semibold">View Details</Text>
      </View>
    </TouchableOpacity>
  );
}
