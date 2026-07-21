import React from 'react';
import { View, Text } from 'react-native';

export function LeaveBalanceCard({ balance }) {
  if (!balance) {
    return null;
  }

  return (
    <View className="bg-white p-4 rounded-2xl border border-border mb-4">
      <Text className="text-textSecondary text-sm mb-2">Leave Balance</Text>
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-textPrimary text-3xl font-bold">{balance.remaining}</Text>
        <Text className="text-primary font-semibold">Remaining</Text>
      </View>
      <View className="flex-row justify-between">
        <View className="flex-1">
          <Text className="text-textSecondary text-xs">Used</Text>
          <Text className="text-textPrimary font-semibold">{balance.used}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-textSecondary text-xs">Total</Text>
          <Text className="text-textPrimary font-semibold">{balance.total}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-textSecondary text-xs">Pending</Text>
          <Text className="text-textPrimary font-semibold">{balance.pending}</Text>
        </View>
      </View>
    </View>
  );
}
