import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay, 
  Easing 
} from 'react-native-reanimated';

export default function Splash() {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) });
    translateY.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.back(1.5)) });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <Animated.View style={animatedStyle} className="items-center">
        <View className="w-20 h-20 bg-white rounded-3xl items-center justify-center mb-6 shadow-md">
          <Text className="text-primary text-4xl font-bold font-inter">H</Text>
        </View>
        <Text className="text-white text-3xl font-bold font-inter tracking-tight mb-2">HRMS Portal</Text>
        <Text className="text-blue-200 text-sm font-inter mb-10 tracking-wide uppercase">Employee Workspace</Text>
        
        <ActivityIndicator size="large" color="#FFFFFF" className="opacity-80" />
      </Animated.View>
    </View>
  );
}
