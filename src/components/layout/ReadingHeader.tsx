import { Ionicons } from '@expo/vector-icons';
import { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Typography } from '@/components/ui/Typography';
import { KANDAS } from '@/constants/kandas';
import { THEME_COLORS } from '@/constants/theme';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useHardwareBack } from '@/hooks/useHardwareBack';
import { goBack } from '@/lib/navigation';
import { routes } from '@/lib/routes';
import type { TKanda } from '@/types/content';

type ReadingHeaderProps = {
  kanda: TKanda;
  sarga: string;
  onShare?: () => void;
};

export function ReadingHeader({ kanda, sarga, onShare }: ReadingHeaderProps) {
  const insets = useSafeAreaInsets();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const saved = isBookmarked(kanda, sarga);
  const kandaName = KANDAS.find((item) => item.id === kanda)?.name ?? kanda;

  const handleBack = useCallback(() => goBack(routes.kanda(kanda)), [kanda]);

  useHardwareBack(handleBack);

  return (
    <View className="border-b border-outline-variant bg-background" style={{ paddingTop: insets.top }}>
      <View className="h-14 flex-row items-center justify-between px-2">
        <Pressable
          className="h-10 w-10 items-center justify-center active:opacity-60"
          onPress={handleBack}
        >
          <Ionicons name="chevron-back" size={24} color={THEME_COLORS.icon} />
        </Pressable>

        <Typography
          variant="label-sm"
          className="mx-2 flex-1 text-center normal-case tracking-widest"
          numberOfLines={1}
        >
          {kandaName} · Ch. {sarga}
        </Typography>

        <View className="w-20 flex-row items-center justify-end">
          {onShare ? (
            <Pressable
              className="h-10 w-10 items-center justify-center active:opacity-60"
              onPress={onShare}
            >
              <Ionicons name="share-outline" size={22} color={THEME_COLORS.icon} />
            </Pressable>
          ) : null}
          <Pressable
            className="h-10 w-10 items-center justify-center active:opacity-60"
            onPress={() => toggleBookmark(kanda, sarga)}
          >
            <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={22} color={THEME_COLORS.icon} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
