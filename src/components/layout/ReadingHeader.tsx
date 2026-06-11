import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Typography } from '@/components/ui/Typography';
import { KANDAS } from '@/constants/kandas';
import { THEME_COLORS } from '@/constants/theme';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useTheme } from '@/hooks/useTheme';
import type { TKanda } from '@/types/content';

type ReadingHeaderProps = {
  kanda: TKanda;
  sarga: string;
};

export function ReadingHeader({ kanda, sarga }: ReadingHeaderProps) {
  const insets = useSafeAreaInsets();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const saved = isBookmarked(kanda, sarga);
  const { isDark } = useTheme();
  const colors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
  const kandaName = KANDAS.find((item) => item.id === kanda)?.name ?? kanda;

  return (
    <View className="border-b border-outline-variant bg-background" style={{ paddingTop: insets.top }}>
      <View className="h-14 flex-row items-center justify-between px-2">
        <Pressable
          className="h-10 w-10 items-center justify-center active:opacity-60"
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.icon} />
        </Pressable>

        <Typography variant="label-sm" className="normal-case tracking-widest">
          {kandaName} · Ch. {sarga}
        </Typography>

        <Pressable
          className="h-10 w-10 items-center justify-center active:opacity-60"
          onPress={() => toggleBookmark(kanda, sarga)}
        >
          <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={22} color={colors.icon} />
        </Pressable>
      </View>
    </View>
  );
}
