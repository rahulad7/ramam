import { Stack } from 'expo-router';

import { THEME_COLORS } from '@/constants/theme';

export default function LibraryLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: THEME_COLORS.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[kanda]/index" />
      <Stack.Screen name="[kanda]/[sarga]" />
    </Stack>
  );
}
