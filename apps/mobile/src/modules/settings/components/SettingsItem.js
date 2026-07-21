import React from 'react';
import { Pressable, Text, View } from 'react-native';

export function SettingsItem({ title, description, onPress, rightContent }) {
  return (
    <Pressable onPress={onPress} className="mb-2 rounded-xl border border-slate-200 bg-white p-3">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-sm font-semibold text-slate-900">{title}</Text>
          {description ? <Text className="mt-1 text-sm text-slate-500">{description}</Text> : null}
        </View>
        {rightContent ? <View className="ml-3">{rightContent}</View> : null}
      </View>
    </Pressable>
  );
}
