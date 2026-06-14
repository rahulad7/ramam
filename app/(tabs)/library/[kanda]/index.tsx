import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Divider } from '@/components/ui/Divider';
import { Typography } from '@/components/ui/Typography';
import { KANDAS } from '@/constants/kandas';
import { THEME_COLORS } from '@/constants/theme';
import { goBackOr } from '@/lib/navigation';
import { useKandaChapters } from '@/hooks/useKandaChapters';
import { useTheme } from '@/hooks/useTheme';
import type { TKanda } from '@/types/content';

export default function KandaScreen() {
  const { kanda } = useLocalSearchParams<{ kanda: TKanda }>();
  const kandaMeta = KANDAS.find((item) => item.id === kanda);
  const { chapters } = useKandaChapters(kanda);
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();
  const colors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;

  if (!kandaMeta) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <Typography variant="body">Kanda not found.</Typography>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <View className="border-b border-outline-variant bg-background" style={{ paddingTop: insets.top }}>
        <View className="h-14 flex-row items-center px-2">
          <Pressable className="h-10 w-10 items-center justify-center" onPress={() => goBackOr('/(tabs)/library')}>
            <Ionicons name="chevron-back" size={24} color={colors.icon} />
          </Pressable>
          <Typography variant="label-sm" className="ml-2 normal-case tracking-widest">
            {kandaMeta.name}
          </Typography>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-10">
        <Typography variant="label-sm">{kandaMeta.subtitle}</Typography>
        <Typography variant="headline" className="mt-2">
          {kandaMeta.name}
        </Typography>
        <Typography variant="caption" className="mt-3 leading-6">
          {kandaMeta.description}
        </Typography>

        <Divider />

        <View className="flex-row flex-wrap gap-2">
          {chapters.map((chapter) => (
            <Pressable
              key={chapter.id}
              onPress={() => router.push(`/library/${kanda}/${chapter.sarga}` as never)}
              className="w-[48%] border border-outline-variant px-3 py-3 active:bg-surface-low"
            >
              <Typography variant="label-sm" className="normal-case tracking-normal">
                {chapter.sarga}. {chapter.title}
              </Typography>
            </Pressable>
          ))}
        </View>

        <Divider />

        <Typography variant="label-sm">Quick Jump</Typography>
        <View className="mt-3 flex-row flex-wrap gap-2">
          {chapters.map((chapter) => (
            <Pressable
              key={`jump-${chapter.id}`}
              onPress={() => router.push(`/library/${kanda}/${chapter.sarga}` as never)}
              className="h-12 w-12 items-center justify-center border border-outline-variant active:bg-surface-container"
            >
              <Typography variant="label-sm" className="normal-case tracking-normal">
                {chapter.sarga}
              </Typography>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
