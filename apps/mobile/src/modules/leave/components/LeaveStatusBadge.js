import React from 'react';
import { View, Text } from 'react-native';

const statusStyles = {
  PENDING: 'bg-amber-100 border-amber-400',
  APPROVED: 'bg-emerald-100 border-emerald-400',
  REJECTED: 'bg-rose-100 border-rose-400',
  CANCELLED: 'bg-slate-100 border-slate-400',
};

const statusTextStyles = {
  PENDING: 'text-amber-700',
  APPROVED: 'text-emerald-700',
  REJECTED: 'text-rose-700',
  CANCELLED: 'text-slate-700',
};

export function LeaveStatusBadge({ status }) {
  const label = status || 'PENDING';
  return (
    <View className={`px-3 py-1 rounded-full border ${statusStyles[label] || statusStyles.PENDING}`}>
      <Text className={`text-xs font-semibold ${statusTextStyles[label] || statusTextStyles.PENDING}`}>{label}</Text>
    </View>
  );
}
