import { Pressable, ScrollView, View } from 'react-native';

import { CharacterCard } from '@/components/characters/CharacterCard';
import { DispatchMasthead } from '@/components/layout/DispatchMasthead';
import { KandaCard } from '@/components/library/KandaCard';
import { ScreenShell } from '@/components/layout/ScreenShell';
import { HtmlText } from '@/components/reading/HtmlText';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Typography } from '@/components/ui/Typography';
import { CHARACTERS } from '@/constants/characters';
import { KANDAS, getKandaName } from '@/constants/kandas';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { getDailyWisdom } from '@/lib/dailyWisdom';
import { openChapter, openKanda, openScreen } from '@/lib/navigation';
import { routes } from '@/lib/routes';

export default function HomeScreen() {
  const { lastRead, getKandaProgress } = useReadingProgress();
  const daily = getDailyWisdom();

  const continueLabel = lastRead
    ? `Continue: ${getKandaName(lastRead.kanda)} · Chapter ${lastRead.sarga}`
    : 'Start with Bala Kanda';

  return (
    <ScreenShell>
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-10">
        <View className="mt-4">
          <DispatchMasthead />
        </View>

        <View className="mt-8 border border-outline-variant bg-surface-low p-5">
          <Typography variant="label-sm">Continue Reading</Typography>
          <Typography variant="body" className="mt-2">
            {continueLabel}
          </Typography>
          <View className="mt-4">
            <Button
              label="Resume"
              onPress={() =>
                lastRead
                  ? openChapter(lastRead.kanda, lastRead.sarga)
                  : openChapter('bala', 1)
              }
            />
          </View>
        </View>

        <Divider />

        {daily ? (
          <View className="border border-outline-variant bg-surface-container p-5">
            <Typography variant="label-sm">Today&apos;s Wisdom</Typography>
            <Typography variant="headline-sm" className="mt-3">
              {daily.title}
            </Typography>
            <Typography variant="caption" className="mt-2">
              {daily.kandaName} · Chapter {daily.sarga}
            </Typography>
            <View className="mt-4">
              <HtmlText html={daily.verseHtml} />
            </View>
            <Typography variant="caption" italic className="mt-4 leading-6">
              {daily.reflection}
            </Typography>
            <View className="mt-4 gap-3">
              <Button
                label="Read full chapter"
                onPress={() => openChapter(daily.kanda, daily.sarga)}
              />
              <Button
                label="Open Daily Wisdom"
                variant="secondary"
                onPress={() => openScreen(routes.dailyWisdom)}
              />
            </View>
          </View>
        ) : null}

        <Divider />

        <View className="flex-row items-center justify-between">
          <Typography variant="label-sm">Characters</Typography>
          <Pressable onPress={() => openScreen(routes.characters)}>
            <Typography variant="caption">See all</Typography>
          </Pressable>
        </View>
        <ScrollView
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          className="mt-4"
        >
          <View className="flex-row gap-3 pr-2">
            {CHARACTERS.slice(0, 6).map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                compact
                onPress={() => openScreen(routes.character(character.id))}
              />
            ))}
          </View>
        </ScrollView>

        <Divider />

        <Typography variant="label-sm">The Six Kandas</Typography>
        <ScrollView
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          className="mt-4"
        >
          <View className="flex-row gap-3 pr-2">
            {KANDAS.map((kanda) => (
              <KandaCard
                key={kanda.id}
                kanda={kanda}
                progress={getKandaProgress(kanda.id, kanda.chapterCount)}
                compact
                onPress={() => openKanda(kanda.id)}
              />
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </ScreenShell>
  );
}
