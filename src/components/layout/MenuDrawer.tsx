import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import Animated, { FadeIn, SlideInLeft } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Typography } from '@/components/ui/Typography';
import { APP_NAME, APP_TAGLINE } from '@/constants/kandas';
import { THEME_COLORS } from '@/constants/theme';
import { useDrawer } from '@/hooks/useDrawer';
import { useTheme } from '@/hooks/useTheme';

type MenuItem = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  href: string;
};

const MENU_ITEMS: MenuItem[] = [
  { label: 'Home', icon: 'home-outline', href: '/(tabs)' },
  { label: 'Library', icon: 'book-outline', href: '/(tabs)/library' },
  { label: 'Daily Wisdom', icon: 'sunny-outline', href: '/(tabs)/daily-wisdom' },
  { label: 'Characters', icon: 'people-outline', href: '/(tabs)/characters' },
  { label: 'Search', icon: 'search-outline', href: '/(tabs)/search' },
  { label: 'Bookmarks', icon: 'bookmark-outline', href: '/(tabs)/bookmarks' },
  { label: 'Highlights', icon: 'color-fill-outline', href: '/(tabs)/highlights' },
  { label: 'Account', icon: 'person-outline', href: '/(tabs)/profile' },
  { label: 'Settings', icon: 'settings-outline', href: '/(tabs)/settings' },
];

const DRAWER_WIDTH = 288;

export function MenuDrawer() {
  const { isOpen, closeDrawer } = useDrawer();
  const { isDark, theme, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const colors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;

  function navigate(href: string) {
    closeDrawer();
    router.navigate(href as never);
  }

  return (
    <Modal visible={isOpen} transparent animationType="none" onRequestClose={closeDrawer}>
      <View className="flex-1 flex-row">
        <Animated.View
          entering={SlideInLeft.duration(260)}
          className="h-full bg-background border-r border-outline-variant"
          style={{
            width: DRAWER_WIDTH,
            maxWidth: '85%',
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
        >
          <View className="border-b border-outline-variant px-5 py-5">
            <Typography variant="label">{APP_NAME}</Typography>
            <Typography variant="caption" italic className="mt-2">
              {APP_TAGLINE}
            </Typography>
          </View>

          <ScrollView className="flex-1" contentContainerClassName="px-3 py-4">
            {MENU_ITEMS.map((item) => (
              <Pressable
                key={item.label}
                className="mb-1 flex-row items-center px-3 py-3 active:bg-surface-low"
                onPress={() => navigate(item.href)}
              >
                <View className="w-7 items-center">
                  <Ionicons name={item.icon} size={20} color={colors.icon} />
                </View>
                <Typography variant="body" className="ml-3">
                  {item.label}
                </Typography>
              </Pressable>
            ))}

            <View className="my-4 mx-3 h-px bg-outline-variant" />

            <Pressable
              className="flex-row items-center px-3 py-3 active:bg-surface-low"
              onPress={toggleTheme}
            >
              <View className="w-7 items-center">
                <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={20} color={colors.icon} />
              </View>
              <Typography variant="body" className="ml-3">
                {theme === 'light' ? 'Dark mode' : 'Light mode'}
              </Typography>
            </Pressable>
          </ScrollView>

          <View className="border-t border-outline-variant px-5 py-4">
            <Typography variant="caption">Offline · 534 chapters bundled</Typography>
          </View>
        </Animated.View>

        <Pressable className="flex-1 bg-black/40" onPress={closeDrawer}>
          <Animated.View entering={FadeIn.duration(200)} className="flex-1" />
        </Pressable>
      </View>
    </Modal>
  );
}
