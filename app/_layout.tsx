import '../global.css';

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';

import { useAppFonts } from '@/hooks/useFonts';
import { useTheme } from '@/hooks/useTheme';
import { BookmarksProvider } from '@/providers/BookmarksProvider';
import { ReadingProgressProvider } from '@/providers/ReadingProgressProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const fontsLoaded = useAppFonts();
  const { isReady, isDark } = useTheme();

  useEffect(() => {
    if (fontsLoaded && isReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isReady]);

  if (!fontsLoaded || !isReady) {
    return <View className="flex-1 bg-background" />;
  }

  return (
    <View className={isDark ? 'dark flex-1' : 'flex-1'}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#fdf8f7' } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ReadingProgressProvider>
        <BookmarksProvider>
          <RootLayoutNav />
        </BookmarksProvider>
      </ReadingProgressProvider>
    </ThemeProvider>
  );
}
