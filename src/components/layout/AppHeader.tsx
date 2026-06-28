import { Ionicons } from '@expo/vector-icons';
import { openScreen } from '@/lib/navigation';
import { routes } from '@/lib/routes';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Typography } from '@/components/ui/Typography';
import { APP_NAME } from '@/constants/kandas';
import { THEME_COLORS } from '@/constants/theme';
import { useCurrentHref } from '@/hooks/useCurrentHref';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useDrawer } from '@/hooks/useDrawer';

type AppHeaderProps = {
  showMenu?: boolean;
  showActions?: boolean;
};

export function AppHeader({ showMenu = true, showActions = true }: AppHeaderProps) {
  const insets = useSafeAreaInsets();
  const currentHref = useCurrentHref();
  const { bookmarks } = useBookmarks();
  const { openDrawer } = useDrawer();

  return (
    <View
      className="bg-background border-b border-outline-variant"
      style={{ paddingTop: insets.top }}
    >
      <View className="relative h-14 flex-row items-center justify-between px-4">
        <View className="z-10 w-10">
          {showMenu ? (
            <Pressable
              accessibilityLabel="Menu"
              style={styles.iconButton}
              onPress={openDrawer}
            >
              <Ionicons name="menu-outline" size={24} color={THEME_COLORS.icon} />
            </Pressable>
          ) : null}
        </View>

        <View className="pointer-events-none absolute inset-x-0 items-center">
          <Typography variant="label" className="tracking-[0.35em]">
            {APP_NAME.toUpperCase()}
          </Typography>
        </View>

        <View className="z-10 w-20 flex-row items-center justify-end gap-1">
          {showActions ? (
            <>
              <Pressable
                accessibilityLabel="Bookmarks"
                style={styles.iconButton}
                onPress={() => openScreen(routes.bookmarks, { returnTo: currentHref })}
              >
                <Ionicons
                  name={bookmarks.length > 0 ? 'bookmark' : 'bookmark-outline'}
                  size={22}
                  color={THEME_COLORS.icon}
                />
              </Pressable>
              <Pressable
                accessibilityLabel="Search"
                style={styles.iconButton}
                onPress={() => openScreen(routes.search, { returnTo: currentHref })}
              >
                <Ionicons name="search-outline" size={22} color={THEME_COLORS.icon} />
              </Pressable>
            </>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
