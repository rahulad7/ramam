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
  { label: 'Search', icon: 'search-outline', href: '/(tabs)/search' },
  { label: 'Bookmarks', icon: 'bookmark-outline', href: '/(tabs)/bookmarks' },
  { label: 'Account', icon: 'person-outline', href: '/(tabs)/profile' },
];

export function MenuDrawer() {
  const { isOpen, closeDrawer } = useDrawer();
  const { isDark, theme, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const colors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;

  function navigate(href: string) {
    closeDrawer();
    router.push(href as never);
  }

  return (
    <Modal visible={isOpen} transparent animationType="none" onRequestClose={closeDrawer}>
      <View className="flex-1 flex-row">
        <Pressable className="flex-1 bg-black/40" onPress={closeDrawer}>
          <Animated.View entering={FadeIn.duration(200)} className="flex-1" />
        </Pressable>

        <Animated.View
          entering={SlideInLeft.duration(260)}
          className="w-[82%] max-w-[320px] bg-background"
          style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        >
          <View className="border-b border-outline-variant px-5 py-5">
            <Typography variant="label">{APP_NAME}</Typography>
            <Typography variant="caption" italic className="mt-2">
              {APP_TAGLINE}
            </Typography>
          </View>

          <ScrollView className="flex-1 px-3 py-4">
            {MENU_ITEMS.map((item) => (
              <Pressable
                key={item.label}
                className="mb-1 flex-row items-center gap-3 px-3 py-3 active:bg-surface-low"
                onPress={() => navigate(item.href)}
              >
                <Ionicons name={item.icon} size={20} color={colors.icon} />
                <Typography variant="body">{item.label}</Typography>
              </Pressable>
            ))}

            <View className="my-4 h-px bg-outline-variant" />

            <Pressable
              className="flex-row items-center gap-3 px-3 py-3 active:bg-surface-low"
              onPress={() => {
                toggleTheme();
              }}
            >
              <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={20} color={colors.icon} />
              <Typography variant="body">
                {theme === 'light' ? 'Dark mode' : 'Light mode'}
              </Typography>
            </Pressable>
          </ScrollView>

          <View className="border-t border-outline-variant px-5 py-4">
            <Typography variant="caption">Phase 2 · Offline reader</Typography>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
