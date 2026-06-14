import { router } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

import { ScreenShell } from '@/components/layout/ScreenShell';
import { Divider } from '@/components/ui/Divider';
import { Typography } from '@/components/ui/Typography';
import { getKandaName } from '@/constants/kandas';
import { useBookmarks } from '@/hooks/useBookmarks';

export default function BookmarksScreen() {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <ScreenShell>
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-10">
        <Typography variant="label-sm">Your Library</Typography>
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
                onPress={() => router.push(`/library/${bookmark.kanda}/${bookmark.sarga}` as never)}
                onLongPress={() => removeBookmark(bookmark.id)}
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
