import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/ui/ThemedView';
import { Typography } from '@/components/ui/Typography';
import { APP_NAME, APP_TAGLINE } from '@/constants/kandas';
import { THEME_COLORS } from '@/constants/theme';
import { useDrawer } from '@/hooks/useDrawer';
import { openScreen, openTab } from '@/lib/navigation';
import { routes } from '@/lib/routes';
import type { Href } from 'expo-router';

type MenuItem = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  href: Href;
  mode: 'tab' | 'stack';
};

const MENU_ITEMS: MenuItem[] = [
  { label: 'Home', icon: 'home-outline', href: routes.home, mode: 'tab' },
  { label: 'Library', icon: 'book-outline', href: routes.library, mode: 'tab' },
  { label: 'Search', icon: 'search-outline', href: routes.search, mode: 'tab' },
  { label: 'Daily Wisdom', icon: 'sunny-outline', href: routes.dailyWisdom, mode: 'stack' },
  { label: 'Characters', icon: 'people-outline', href: routes.characters, mode: 'stack' },
  { label: 'Bookmarks', icon: 'bookmark-outline', href: routes.bookmarks, mode: 'stack' },
  { label: 'Highlights', icon: 'color-fill-outline', href: routes.highlights, mode: 'stack' },
  { label: 'Account', icon: 'person-outline', href: routes.profile, mode: 'tab' },
  { label: 'Settings', icon: 'settings-outline', href: routes.settings, mode: 'stack' },
];

const DRAWER_WIDTH = 300;
const OPEN_DURATION = 320;
const CLOSE_DURATION = 260;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  panel: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
    maxWidth: '86%',
    backgroundColor: THEME_COLORS.background,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: 'rgba(24, 21, 18, 0.12)',
    shadowColor: '#181512',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 16,
  },
  closeButton: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export function MenuDrawer() {
  const { isOpen, closeDrawer } = useDrawer();
  const insets = useSafeAreaInsets();
  const [mounted, setMounted] = useState(false);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      progress.value = withTiming(1, {
        duration: OPEN_DURATION,
        easing: Easing.out(Easing.cubic),
      });
      return;
    }

    if (!mounted) return;

    progress.value = withTiming(
      0,
      {
        duration: CLOSE_DURATION,
        easing: Easing.in(Easing.cubic),
      },
      (finished) => {
        if (finished) {
          runOnJS(setMounted)(false);
        }
      }
    );
  }, [isOpen, mounted, progress]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 0.45]),
  }));

  const panelStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(progress.value, [0, 1], [-DRAWER_WIDTH, 0]),
      },
    ],
  }));

  function navigate(item: MenuItem) {
    closeDrawer();
    if (item.mode === 'tab') {
      openTab(item.href);
      return;
    }
    openScreen(item.href);
  }

  if (!mounted) return null;

  return (
    <Modal visible transparent animationType="none" onRequestClose={closeDrawer} statusBarTranslucent>
      <ThemedView style={styles.root}>
        <Pressable style={styles.backdrop} onPress={closeDrawer} accessibilityLabel="Close menu">
          <Animated.View style={[styles.backdrop, { backgroundColor: '#181512' }, backdropStyle]} />
        </Pressable>

        <Animated.View
          style={[
            styles.panel,
            panelStyle,
            {
              width: DRAWER_WIDTH,
              paddingTop: insets.top + 8,
              paddingBottom: insets.bottom + 8,
            },
          ]}
        >
          <View className="border-b border-outline-variant px-5 pb-5 pt-2">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-3">
                <Typography variant="label">{APP_NAME}</Typography>
                <Typography variant="caption" italic className="mt-2 leading-5">
                  {APP_TAGLINE}
                </Typography>
              </View>
              <Pressable
                accessibilityLabel="Close menu"
                style={styles.closeButton}
                onPress={closeDrawer}
                className="active:opacity-60"
              >
                <Ionicons name="close" size={22} color={THEME_COLORS.icon} />
              </Pressable>
            </View>
          </View>

          <ScrollView
            className="flex-1"
            contentContainerClassName="px-3 py-4"
            showsVerticalScrollIndicator={false}
          >
            {MENU_ITEMS.map((item) => (
              <Pressable
                key={item.label}
                className="mb-1 flex-row items-center px-3 py-3 active:bg-surface-low"
                onPress={() => navigate(item)}
              >
                <View className="w-7 items-center">
                  <Ionicons name={item.icon} size={20} color={THEME_COLORS.icon} />
                </View>
                <Typography variant="body" className="ml-3">
                  {item.label}
                </Typography>
              </Pressable>
            ))}
          </ScrollView>

          <View className="border-t border-outline-variant px-5 py-4">
            <Typography variant="caption">Offline · 534 chapters bundled</Typography>
          </View>
        </Animated.View>
      </ThemedView>
    </Modal>
  );
}
