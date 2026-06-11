import { ScrollView, View } from 'react-native';

import { ScreenShell } from '@/components/layout/ScreenShell';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Typography } from '@/components/ui/Typography';
import { APP_NAME } from '@/constants/kandas';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { useTheme } from '@/hooks/useTheme';

export default function ProfileScreen() {
  const { theme, toggleTheme } = useTheme();
  const { lastRead } = useReadingProgress();
  const { bookmarks } = useBookmarks();

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
          <Typography variant="caption" className="mt-2">
            Sign in arrives in a later phase. Progress, bookmarks, and search history stay on this device.
          </Typography>
        </View>

        <Divider />

        <Typography variant="label-sm">Reading Progress</Typography>
        <Typography variant="body" className="mt-3">
          {lastRead
            ? `Last read: ${lastRead.kanda} · Chapter ${lastRead.sarga}`
            : 'You have not started reading yet.'}
        </Typography>
        <Typography variant="caption" className="mt-2">
          {bookmarks.length} saved chapter{bookmarks.length === 1 ? '' : 's'}
        </Typography>

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
          {APP_NAME} · Phase 2
        </Typography>
      </ScrollView>
    </ScreenShell>
  );
}
