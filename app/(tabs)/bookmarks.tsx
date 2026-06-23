import { Alert, Pressable, ScrollView, View } from 'react-native';

import { BackLink } from '@/components/layout/BackLink';
import { ScreenShell } from '@/components/layout/ScreenShell';
import { Divider } from '@/components/ui/Divider';
import { Typography } from '@/components/ui/Typography';
import { getKandaName } from '@/constants/kandas';
import { useBookmarks } from '@/hooks/useBookmarks';
import { openChapter } from '@/lib/navigation';
import { routes } from '@/lib/routes';

export default function BookmarksScreen() {
  const { bookmarks, removeBookmark } = useBookmarks();

  function confirmRemove(id: string, title: string) {
    Alert.alert('Remove bookmark?', title, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => removeBookmark(id),
      },
    ]);
  }

  return (
    <ScreenShell>
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-10">
        <BackLink fallback={routes.profile} />

        <Typography variant="label-sm" className="mt-4">
          Your Library
        </Typography>
        <Typography variant="headline" className="mt-2">
          Saved Chapters
        </Typography>

        <Divider />

        {bookmarks.length === 0 ? (
          <Typography variant="body" className="text-on-surface-variant">
            No bookmarks yet. Tap the bookmark icon while reading a chapter to save it here.
          </Typography>
        ) : (
          <View className="gap-3">
            {bookmarks.map((bookmark) => (
              <Pressable
                key={bookmark.id}
                className="border border-outline-variant bg-surface-low px-4 py-4 active:bg-surface-container"
                onPress={() => openChapter(bookmark.kanda, bookmark.sarga)}
                onLongPress={() => confirmRemove(bookmark.id, bookmark.title)}
              >
                <Typography variant="label-sm" className="normal-case tracking-normal">
                  {getKandaName(bookmark.kanda)} · Chapter {bookmark.sarga}
                </Typography>
                <Typography variant="body" className="mt-2">
                  {bookmark.title}
                </Typography>
                <Typography variant="caption" className="mt-2">
                  Long press to remove
                </Typography>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </ScreenShell>
  );
}
