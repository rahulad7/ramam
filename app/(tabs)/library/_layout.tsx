import { Stack } from 'expo-router';
import { Platform } from 'react-native';

import { THEME_COLORS } from '@/constants/theme';

export default function LibraryLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: THEME_COLORS.background },
        animation: Platform.OS === 'ios' ? 'default' : 'slide_from_right',
        animationDuration: 220,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[kanda]/index" />
      <Stack.Screen name="[kanda]/[sarga]" />
    </Stack>
  );
}
