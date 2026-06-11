import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Typography } from '@/components/ui/Typography';
import { APP_NAME } from '@/constants/kandas';
import { useBookmarks } from '@/hooks/useBookmarks';

type AppHeaderProps = {
  showMenu?: boolean;
  showActions?: boolean;
};

export function AppHeader({ showMenu = true, showActions = true }: AppHeaderProps) {
  const insets = useSafeAreaInsets();
  const { bookmarks } = useBookmarks();

  return (
    <View
      className="bg-background border-b border-outline-variant"
      style={{ paddingTop: insets.top }}
    >
      <View className="h-14 flex-row items-center justify-between px-4">
        <View className="w-10">
          {showMenu ? (
            <Pressable
              accessibilityLabel="Menu"
              className="h-10 w-10 items-center justify-center active:opacity-60"
              onPress={() => {}}
            >
              <Ionicons name="menu-outline" size={24} color="#181512" />
            </Pressable>
          ) : null}
        </View>

        <Typography variant="label" className="tracking-[0.35em]">
          {APP_NAME.toUpperCase()}
        </Typography>

        <View className="w-20 flex-row items-center justify-end gap-1">
          {showActions ? (
            <>
              <Pressable
                accessibilityLabel="Bookmarks"
                className="h-10 w-10 items-center justify-center active:opacity-60"
                onPress={() => router.push('/(tabs)/bookmarks' as never)}
              >
                <Ionicons
                  name={bookmarks.length > 0 ? 'bookmark' : 'bookmark-outline'}
                  size={22}
                  color="#181512"
                />
              </Pressable>
              <Pressable
                accessibilityLabel="Search"
                className="h-10 w-10 items-center justify-center active:opacity-60"
                onPress={() => router.push('/(tabs)/search' as never)}
              >
                <Ionicons name="search-outline" size={22} color="#181512" />
              </Pressable>
            </>
          ) : null}
        </View>
      </View>
    </View>
  );
}
