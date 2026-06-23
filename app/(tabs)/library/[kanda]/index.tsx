import { useLocalSearchParams } from 'expo-router';
import { Image, Pressable, ScrollView, View } from 'react-native';

import { StackHeader } from '@/components/layout/StackHeader';
import { Divider } from '@/components/ui/Divider';
import { ThemedView } from '@/components/ui/ThemedView';
import { Typography } from '@/components/ui/Typography';
import { KANDAS } from '@/constants/kandas';
import { useKandaChapters } from '@/hooks/useKandaChapters';
import { openChapter } from '@/lib/navigation';
import { routes } from '@/lib/routes';
import type { TKanda } from '@/types/content';

export default function KandaScreen() {
  const { kanda } = useLocalSearchParams<{ kanda: TKanda }>();
  const kandaMeta = KANDAS.find((item) => item.id === kanda);
  const { chapters } = useKandaChapters(kanda);

  if (!kandaMeta) {
    return (
      <ThemedView className="flex-1 items-center justify-center bg-background px-6">
        <Typography variant="body">Kanda not found.</Typography>
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-1 bg-background">
      <StackHeader title={kandaMeta.name} fallback={routes.library} />

      <ScrollView className="flex-1" contentContainerClassName="pb-10">
        <Image
          source={kandaMeta.image}
          className="h-52 w-full"
          resizeMode="cover"
          accessibilityLabel={kandaMeta.name}
        />

        <View className="px-5 pt-6">
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
                onPress={() => openChapter(kanda, chapter.sarga)}
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
                onPress={() => openChapter(kanda, chapter.sarga)}
                className="h-12 w-12 items-center justify-center border border-outline-variant active:bg-surface-container"
              >
                <Typography variant="label-sm" className="normal-case tracking-normal">
                  {chapter.sarga}
                </Typography>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
