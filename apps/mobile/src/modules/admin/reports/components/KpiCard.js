import React from 'react';
import { View, Text } from 'react-native';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react-native';

export const KpiCard = ({ metric }) => {
  const isUp = metric.trend_direction === 'up';
  const isDown = metric.trend_direction === 'down';
  
  return (
    <View className="bg-white p-4 rounded-xl shadow-sm border border-border flex-1 mx-1">
      <Text className="text-textSecondary text-xs font-medium mb-1">{metric.label}</Text>
      <Text className="text-textPrimary text-xl font-bold">{metric.value}</Text>
      
      {metric.trend_percentage !== undefined && (
        <View className="flex-row items-center mt-2">
          {isUp && <TrendingUp size={14} color="#10B981" />}
          {isDown && <TrendingDown size={14} color="#EF4444" />}
          {!isUp && !isDown && <Minus size={14} color="#64748B" />}
          
          <Text className={`text-xs ml-1 ${isUp ? 'text-success' : isDown ? 'text-error' : 'text-textSecondary'}`}>
            {metric.trend_percentage}%
          </Text>
        </View>
      )}
    </View>
  );
};
