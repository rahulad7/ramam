import { ScrollView, View } from 'react-native';

import { KandaCard } from '@/components/library/KandaCard';
import { ScreenShell } from '@/components/layout/ScreenShell';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Typography } from '@/components/ui/Typography';
import { KANDAS } from '@/constants/kandas';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { openChapter, openKanda } from '@/lib/navigation';

export default function LibraryScreen() {
  const { lastRead, getKandaProgress, getOverallProgress } = useReadingProgress();

  const totalChapters = KANDAS.reduce((sum, kanda) => sum + kanda.chapterCount, 0);
  const overallProgress = Math.round(getOverallProgress(totalChapters) * 100);

  return (
    <ScreenShell>
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-10">
        <View className="mt-4">
          <Typography variant="label-sm">The Archive</Typography>
          <Typography variant="headline" className="mt-2">
            The Six Kandas
          </Typography>
          <Typography variant="caption" italic className="mt-3 leading-6">
            &quot;Every word of the Ramayana leads to the ultimate truth.&quot;
          </Typography>
          <Typography variant="caption" className="mt-2 leading-6">
            Explore the journey of Rama across the six books that form the bedrock of the epic.
          </Typography>
        </View>

        <View className="mt-6 self-start border border-outline-variant bg-surface-container px-4 py-3">
          <Typography variant="label-sm" className="normal-case tracking-normal">
            Total Completion: {overallProgress}%
          </Typography>
        </View>

        <View className="mt-8">
          {KANDAS.map((kanda) => (
            <KandaCard
              key={kanda.id}
              kanda={kanda}
              progress={getKandaProgress(kanda.id, kanda.chapterCount)}
              onPress={() => openKanda(kanda.id)}
            />
          ))}
        </View>

        <Divider />

        <Typography variant="headline-sm" italic className="text-center">
          True knowledge is the root of liberation.
        </Typography>
        <Typography variant="caption" className="mt-4 text-center leading-6">
          Begin your journey through the six books of the Valmiki Ramayana.
        </Typography>

        <View className="mt-6">
          <Button
            label="Start Reading Now"
            variant="secondary"
            onPress={() =>
              lastRead ? openChapter(lastRead.kanda, lastRead.sarga) : openChapter('bala', 1)
            }
          />
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
