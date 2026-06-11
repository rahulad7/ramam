import { Stack } from 'expo-router';

import { THEME_COLORS } from '@/constants/theme';
import { useTheme } from '@/hooks/useTheme';

export default function LibraryLayout() {
  const { isDark } = useTheme();
  const backgroundColor = isDark ? THEME_COLORS.dark.background : THEME_COLORS.light.background;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[kanda]/index" />
      <Stack.Screen name="[kanda]/[sarga]" />
    </Stack>
  );
}
