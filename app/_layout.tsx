import '../global.css';
import 'react-native-gesture-handler';

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { AnimatedSplash } from '@/components/layout/AnimatedSplash';
import { MenuDrawer } from '@/components/layout/MenuDrawer';
import { OnboardingOverlay } from '@/components/layout/OnboardingOverlay';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { THEME_COLORS } from '@/constants/theme';
import { themeVars } from '@/constants/themeVars';
import { useAppFonts } from '@/hooks/useFonts';
import { BookmarksProvider } from '@/providers/BookmarksProvider';
import { DrawerProvider } from '@/providers/DrawerProvider';
import { HighlightsProvider } from '@/providers/HighlightsProvider';
import { ReadingProgressProvider } from '@/providers/ReadingProgressProvider';
import { ReadingSettingsProvider } from '@/providers/ReadingSettingsProvider';

SplashScreen.preventAutoHideAsync();

const SPLASH_DURATION_MS = 3000;
const backgroundColor = THEME_COLORS.background;

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

function RootLayoutNav() {
  const fontsLoaded = useAppFonts();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (!fontsLoaded) return;

    SplashScreen.hideAsync();

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timer);
  }, [fontsLoaded]);

  useEffect(() => {
    if (!fontsLoaded || showSplash) return;

    const warmup = setTimeout(() => {
      void import('@/lib/search').then(({ warmSearchIndex }) => warmSearchIndex());
    }, 250);

    return () => clearTimeout(warmup);
  }, [fontsLoaded, showSplash]);

  return (
    <DrawerProvider>
      <View style={[styles.root, themeVars, { backgroundColor }]}>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor } }} />
        <MenuDrawer />
        <OnboardingOverlay enabled={fontsLoaded && !showSplash} />
        {!fontsLoaded ? (
          <View style={[StyleSheet.absoluteFillObject, styles.overlay, { backgroundColor }]}>
            <ActivityIndicator color={THEME_COLORS.icon} />
          </View>
        ) : showSplash ? (
          <AnimatedSplash />
        ) : null}
      </View>
    </DrawerProvider>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <ReadingSettingsProvider>
        <ReadingProgressProvider>
          <BookmarksProvider>
            <HighlightsProvider>
              <RootLayoutNav />
            </HighlightsProvider>
          </BookmarksProvider>
        </ReadingProgressProvider>
      </ReadingSettingsProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  overlay: {
    zIndex: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
