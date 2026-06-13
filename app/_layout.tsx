import '../global.css';

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { AnimatedSplash } from '@/components/layout/AnimatedSplash';
import { MenuDrawer } from '@/components/layout/MenuDrawer';
import { OnboardingOverlay } from '@/components/layout/OnboardingOverlay';
import { THEME_COLORS } from '@/constants/theme';
import { useAppFonts } from '@/hooks/useFonts';
import { useTheme } from '@/hooks/useTheme';
import { BookmarksProvider } from '@/providers/BookmarksProvider';
import { DrawerProvider } from '@/providers/DrawerProvider';
import { HighlightsProvider } from '@/providers/HighlightsProvider';
import { ReadingProgressProvider } from '@/providers/ReadingProgressProvider';
import { ReadingSettingsProvider } from '@/providers/ReadingSettingsProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

SplashScreen.preventAutoHideAsync();

const SPLASH_DURATION_MS = 2800;

function RootLayoutNav() {
  const fontsLoaded = useAppFonts();
  const { isReady, isDark } = useTheme();
  const [showSplash, setShowSplash] = useState(true);
  const backgroundColor = isDark ? THEME_COLORS.dark.background : THEME_COLORS.light.background;
  const appReady = fontsLoaded && isReady;

  useEffect(() => {
    if (!appReady) return;

    SplashScreen.hideAsync();

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timer);
  }, [appReady]);

  if (!appReady) {
    return <View className="flex-1 bg-background" />;
  }

  return (
    <DrawerProvider>
      <View className={isDark ? 'dark flex-1' : 'flex-1'}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor } }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
        </Stack>
        <MenuDrawer />
        <OnboardingOverlay />
        {showSplash ? <AnimatedSplash /> : null}
      </View>
    </DrawerProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ReadingSettingsProvider>
        <ReadingProgressProvider>
          <BookmarksProvider>
            <HighlightsProvider>
              <RootLayoutNav />
            </HighlightsProvider>
          </BookmarksProvider>
        </ReadingProgressProvider>
      </ReadingSettingsProvider>
    </ThemeProvider>
  );
}
