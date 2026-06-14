import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { ScreenShell } from '@/components/layout/ScreenShell';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Typography } from '@/components/ui/Typography';
import { APP_NAME, KANDAS, getKandaName } from '@/constants/kandas';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useHighlights } from '@/hooks/useHighlights';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { useTheme } from '@/hooks/useTheme';

export default function ProfileScreen() {
  const { theme, toggleTheme } = useTheme();
  const { lastRead, stats, getOverallProgress } = useReadingProgress();
  const { bookmarks } = useBookmarks();
  const { highlights } = useHighlights();

  const totalChapters = KANDAS.reduce((sum, k) => sum + k.chapterCount, 0);
  const overall = Math.round(getOverallProgress(totalChapters) * 100);

  return (
    <ScreenShell>
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-10">
        <View className="mt-4">
          <Typography variant="label-sm">Account</Typography>
          <Typography variant="headline" className="mt-2">
            Reader Profile
          </Typography>
        </View>

        <View className="mt-8 border border-outline-variant bg-surface-low p-5">
          <Typography variant="label-sm">Reader</Typography>
          <Typography variant="headline-sm" className="mt-2">
            Guest Reader
          </Typography>
          <Typography variant="caption" className="mt-2 leading-6">
            Full offline access. Bookmarks, highlights, and progress stay on this device.
          </Typography>
        </View>

        <Divider />

        <Typography variant="label-sm">Reading stats</Typography>
        <View className="mt-4 gap-2">
          <Typography variant="body">Overall progress: {overall}%</Typography>
          <Typography variant="body">Chapters opened: {stats.chaptersOpened}</Typography>
          <Typography variant="body">Reading streak: {stats.streakDays} day{stats.streakDays === 1 ? '' : 's'}</Typography>
          <Typography variant="caption" className="mt-1">
            {lastRead
              ? `Last read: ${getKandaName(lastRead.kanda)} · Chapter ${lastRead.sarga}`
              : 'You have not started reading yet.'}
          </Typography>
          <Typography variant="caption">
            {bookmarks.length} bookmark{bookmarks.length === 1 ? '' : 's'} · {highlights.length} highlight
            {highlights.length === 1 ? '' : 's'}
          </Typography>
        </View>

        <Divider />

        <View className="gap-3">
          <Button label="Highlights" variant="secondary" onPress={() => router.push('/(tabs)/highlights' as never)} />
          <Button label="Bookmarks" variant="secondary" onPress={() => router.push('/(tabs)/bookmarks' as never)} />
          <Button label="Settings" variant="secondary" onPress={() => router.push('/(tabs)/settings' as never)} />
        </View>

        <Divider />

        <Typography variant="label-sm">Appearance</Typography>
        <Typography variant="caption" className="mt-2">
          Current theme: {theme}
        </Typography>
        <View className="mt-4">
          <Button
            label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            variant="secondary"
            onPress={toggleTheme}
          />
        </View>

        <Divider />

        <Typography variant="caption" className="text-center">
          {APP_NAME} · Complete offline reader
        </Typography>
      </ScrollView>
    </ScreenShell>
  );
}
