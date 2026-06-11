import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { ScreenShell } from '@/components/layout/ScreenShell';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Typography } from '@/components/ui/Typography';
import { KANDAS } from '@/constants/kandas';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { getSarga } from '@/lib/content';

export default function HomeScreen() {
  const { lastRead } = useReadingProgress();

  const continueLabel = lastRead
    ? `Continue: ${lastRead.kanda} · Chapter ${lastRead.sarga}`
    : 'Start with Bala Kanda';

  const continueHref = lastRead
    ? `/library/${lastRead.kanda}/${lastRead.sarga}`
    : '/library/bala/1';

  const featuredSarga = getSarga('bala', '1');

  return (
    <ScreenShell>
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-10">
        <View className="mt-4">
          <Typography variant="label-sm">The Archive</Typography>
          <Typography variant="headline" className="mt-2">
            Ancient Wisdom, Daily Reflections
          </Typography>
          <Typography variant="caption" className="mt-3 leading-6">
            Personalized knowledge from the ancient epics, curated for the modern seeker.
          </Typography>
        </View>

        <View className="mt-8 border border-outline-variant bg-surface-low p-5">
          <Typography variant="label-sm">Continue Reading</Typography>
          <Typography variant="body" className="mt-2">
            {continueLabel}
          </Typography>
          <View className="mt-4">
            <Button label="Resume" onPress={() => router.push(continueHref as never)} />
          </View>
        </View>

        <Divider />

        <Typography variant="label-sm">Today&apos;s Opening</Typography>
        <Typography variant="headline-sm" className="mt-3">
          {featuredSarga?.title ?? 'Narada briefs Valmiki'}
        </Typography>
        <Typography variant="caption" className="mt-3 leading-6">
          {featuredSarga?.overview.slice(0, 220)}...
        </Typography>

        <Divider />

        <Typography variant="label-sm">The Six Kandas</Typography>
        <View className="mt-4 gap-3">
          {KANDAS.map((kanda) => (
            <Button
              key={kanda.id}
              label={kanda.name}
              variant="secondary"
              onPress={() => router.push(`/library/${kanda.id}` as never)}
            />
          ))}
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
