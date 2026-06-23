import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSegments } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Typography } from '@/components/ui/Typography';
import { THEME_COLORS } from '@/constants/theme';
import { useTheme } from '@/hooks/useTheme';

type TabConfig = {
  name: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconFocused: keyof typeof Ionicons.glyphMap;
};

const TABS: TabConfig[] = [
  { name: 'index', label: 'Home', icon: 'home-outline', iconFocused: 'home' },
  { name: 'library', label: 'Library', icon: 'book-outline', iconFocused: 'book' },
  { name: 'search', label: 'Search', icon: 'search-outline', iconFocused: 'search' },
  { name: 'profile', label: 'Account', icon: 'person-outline', iconFocused: 'person' },
];

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const segments = useSegments();
  const { isDark } = useTheme();
  const colors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
  const focusedRouteName = state.routes[state.index]?.name;

  const inNestedLibrary =
    segments.includes('library') && segments.indexOf('library') < segments.length - 1;
  const inNestedCharacters =
    segments.includes('characters') && segments.indexOf('characters') < segments.length - 1;

  if (inNestedLibrary || inNestedCharacters) {
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
          const color = isFocused ? colors.icon : colors.iconMuted;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
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
