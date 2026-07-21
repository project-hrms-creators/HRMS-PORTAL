import React from 'react';
import { Text, View, Pressable } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming 
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function QuickActionCard({ title, onPress, iconName }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
    opacity.value = withTiming(0.8, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    opacity.value = withTiming(1, { duration: 150 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <AnimatedPressable 
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className="bg-white rounded-[20px] p-5 shadow-sm border border-border items-center justify-center m-1.5 flex-1"
      style={animatedStyle}
      accessibilityRole="button"
      accessibilityLabel={`Navigate to ${title}`}
    >
      <View className="w-14 h-14 bg-surface rounded-full items-center justify-center mb-3 border border-border shadow-sm">
        {/* Placeholder for icon */}
        <Text className="text-primary font-bold text-xl">{iconName ? iconName[0].toUpperCase() : title[0]}</Text>
      </View>
      <Text className="text-textPrimary text-sm font-bold font-inter text-center">{title}</Text>
    </AnimatedPressable>
  );
}
