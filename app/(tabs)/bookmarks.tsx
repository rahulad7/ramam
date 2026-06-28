import { useState } from 'react';
import { ActivityIndicator, Alert, InteractionManager, Pressable, ScrollView, View } from 'react-native';

import { BackLink } from '@/components/layout/BackLink';
import { ScreenShell } from '@/components/layout/ScreenShell';
import { Divider } from '@/components/ui/Divider';
import { Typography } from '@/components/ui/Typography';
import { getKandaName } from '@/constants/kandas';
import { THEME_COLORS } from '@/constants/theme';
import { useBookmarks } from '@/hooks/useBookmarks';
import { openChapter } from '@/lib/navigation';
import { routes } from '@/lib/routes';

export default function BookmarksScreen() {
  const { bookmarks, removeBookmark } = useBookmarks();
  const [openingId, setOpeningId] = useState<string | null>(null);

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

  function openBookmark(bookmark: (typeof bookmarks)[number]) {
    if (openingId) return;

    setOpeningId(bookmark.id);
    InteractionManager.runAfterInteractions(() => {
      openChapter(bookmark.kanda, bookmark.sarga, { returnTo: routes.bookmarks });
      setOpeningId(null);
    });
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
            {bookmarks.map((bookmark) => {
              const isOpening = openingId === bookmark.id;

              return (
                <Pressable
                  key={bookmark.id}
                  className="border border-outline-variant bg-surface-low px-4 py-4 active:bg-surface-container"
                  onPress={() => openBookmark(bookmark)}
                  onLongPress={() => confirmRemove(bookmark.id, bookmark.title)}
                  disabled={isOpening}
                >
                  <View className="flex-row items-start justify-between gap-3">
                    <View className="flex-1">
                      <Typography variant="label-sm" className="normal-case tracking-normal">
                        {getKandaName(bookmark.kanda)} · Chapter {bookmark.sarga}
                      </Typography>
                      <Typography variant="body" className="mt-2">
                        {bookmark.title}
                      </Typography>
                      <Typography variant="caption" className="mt-2">
                        Long press to remove
                      </Typography>
                    </View>
                    {isOpening ? (
                      <ActivityIndicator size="small" color={THEME_COLORS.icon} />
                    ) : null}
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}
      </ScrollView>
    </ScreenShell>
  );
}
