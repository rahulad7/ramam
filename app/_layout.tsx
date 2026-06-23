import '../global.css';
import 'react-native-gesture-handler';

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
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

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

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

  return (
    <DrawerProvider>
      <View style={[styles.root, { backgroundColor }]}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor } }} />
        <MenuDrawer />
        <OnboardingOverlay enabled={appReady && !showSplash} />
        {!appReady ? (
          <View style={[StyleSheet.absoluteFillObject, styles.overlay, { backgroundColor }]} />
        ) : showSplash ? (
          <AnimatedSplash />
        ) : null}
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  overlay: {
    zIndex: 50,
  },
});
