import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

export function GreetingHeader({ user }) {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      setCurrentDate(now.toLocaleDateString('en-US', options));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  // Use a fallback greeting if user object isn't fully structured yet
  const name = user?.name || user?.email?.split('@')[0] || 'Employee';

  return (
    <View className="mb-6 px-4 pt-6 pb-4 bg-primary rounded-b-3xl">
      <Text className="text-white text-3xl font-bold font-inter mb-1">Hello, {name}!</Text>
      <Text className="text-blue-100 text-sm font-inter">{currentDate}</Text>
    </View>
  );
}
