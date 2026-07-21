import React from 'react';
import { View, Text, Image } from 'react-native';

export function ProfileHeader({ profile }) {
  return (
    <View className="bg-white rounded-2xl border border-border p-4 mb-4">
      <View className="flex-row items-center">
        <View className="w-16 h-16 rounded-full bg-surface items-center justify-center overflow-hidden mr-4">
          {profile?.avatarUrl ? (
            <Image source={{ uri: profile.avatarUrl }} className="w-full h-full" />
          ) : (
            <Text className="text-primary text-2xl font-semibold">{profile?.firstName?.[0] || 'U'}</Text>
          )}
        </View>
        <View className="flex-1">
          <Text className="text-textPrimary text-xl font-semibold">{profile?.firstName} {profile?.lastName}</Text>
          <Text className="text-textSecondary text-sm">{profile?.designation}</Text>
          <Text className="text-textSecondary text-sm">{profile?.employeeId}</Text>
        </View>
      </View>
    </View>
  );
}
