import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSegments } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Typography } from '@/components/ui/Typography';
import { THEME_COLORS } from '@/constants/theme';
import { popTabToRoot } from '@/lib/navigation';
import { routes } from '@/lib/routes';

type TabConfig = {
  name: 'index' | 'library' | 'search' | 'profile';
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconFocused: keyof typeof Ionicons.glyphMap;
  href: typeof routes.home | typeof routes.library | typeof routes.search | typeof routes.profile;
};

const TABS: TabConfig[] = [
  { name: 'index', label: 'Home', icon: 'home-outline', iconFocused: 'home', href: routes.home },
  { name: 'library', label: 'Library', icon: 'book-outline', iconFocused: 'book', href: routes.library },
  { name: 'search', label: 'Search', icon: 'search-outline', iconFocused: 'search', href: routes.search },
  { name: 'profile', label: 'Account', icon: 'person-outline', iconFocused: 'person', href: routes.profile },
];

const HIDDEN_TAB_SCREENS = new Set([
  'bookmarks',
  'highlights',
  'settings',
  'daily-wisdom',
  'characters',
]);

function shouldHideTabBar(segments: string[]) {
  if (segments.includes('library') && segments.indexOf('library') < segments.length - 1) {
    return true;
  }

  if (segments.includes('characters') && segments.indexOf('characters') < segments.length - 1) {
    return true;
  }

  return segments.some((segment) => HIDDEN_TAB_SCREENS.has(segment));
}

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const segments = useSegments();
  const focusedRouteName = state.routes[state.index]?.name;

  if (shouldHideTabBar(segments)) {
    return null;
  }

  return (
    <View
      className="border-t border-outline-variant bg-background"
      style={{ paddingBottom: Math.max(insets.bottom, 8) }}
    >
      <View className="flex-row items-center justify-around px-2 pt-2">
        {TABS.map((tab) => {
          const route = state.routes.find((item) => item.name === tab.name);
          if (!route) return null;

          const isFocused = focusedRouteName === tab.name;
          const color = isFocused ? THEME_COLORS.icon : THEME_COLORS.iconMuted;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) return;

            if (isFocused) {
              popTabToRoot(tab.name);
              return;
            }

            navigation.navigate(route.name);
          };

          return (
            <Pressable
              key={tab.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              style={styles.tabButton}
              onPress={onPress}
            >
              <Ionicons name={isFocused ? tab.iconFocused : tab.icon} size={22} color={color} />
              <Typography
                variant="label-sm"
                className={`mt-1 normal-case tracking-widest ${isFocused ? 'text-primary' : 'text-outline'}`}
              >
                {tab.label}
              </Typography>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    minWidth: 72,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
});
