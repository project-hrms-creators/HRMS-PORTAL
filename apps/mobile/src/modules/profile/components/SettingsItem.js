import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export function SettingsItem({ title, description, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} className="bg-white border border-border rounded-xl p-3 mb-2">
      <Text className="text-textPrimary font-semibold">{title}</Text>
      {description ? <Text className="text-textSecondary text-sm mt-1">{description}</Text> : null}
    </TouchableOpacity>
  );
}
