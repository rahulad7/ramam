import { useState } from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';

import { BackLink } from '@/components/layout/BackLink';
import { ScreenShell } from '@/components/layout/ScreenShell';
import { Divider } from '@/components/ui/Divider';
import { NotePromptModal } from '@/components/ui/NotePromptModal';
import { Typography } from '@/components/ui/Typography';
import { KANDAS } from '@/constants/kandas';
import { useHighlights } from '@/hooks/useHighlights';
import { openChapter } from '@/lib/navigation';
import { routes } from '@/lib/routes';
import type { Highlight } from '@/types/highlight';

export default function HighlightsScreen() {
  const { highlights, removeHighlight, updateNote } = useHighlights();
  const [noteTarget, setNoteTarget] = useState<Highlight | null>(null);

  function confirmRemove(item: Highlight) {
    Alert.alert('Remove highlight?', item.excerpt.slice(0, 80), [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => removeHighlight(item.id),
      },
    ]);
  }

  return (
    <ScreenShell>
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-10">
        <BackLink fallback={routes.profile} />

        <Typography variant="label-sm" className="mt-4">
          Your Study
        </Typography>
        <Typography variant="headline" className="mt-2">
          Highlights
        </Typography>
        <Typography variant="caption" className="mt-3 leading-6">
          Tap to open the chapter. Use &quot;Add note&quot; or long press to remove.
        </Typography>

        <Divider />

        {highlights.length === 0 ? (
          <Typography variant="body" className="text-on-surface-variant">
            No highlights yet. Open any chapter and tap the highlight icon on a passage.
          </Typography>
        ) : (
          <View className="gap-3">
            {highlights.map((item) => {
              const kandaName = KANDAS.find((k) => k.id === item.kanda)?.name ?? item.kanda;
              return (
                <View
                  key={item.id}
                  className="border border-outline-variant bg-surface-low px-4 py-4"
                >
                  <Pressable onPress={() => openChapter(item.kanda, item.sarga)}>
                    <Typography variant="label-sm" className="normal-case tracking-normal">
                      {kandaName} · Ch. {item.sarga} · {item.blockType}
                    </Typography>
                    <Typography variant="body" className="mt-2 leading-6">
                      {item.excerpt}
                    </Typography>
                    {item.note ? (
                      <Typography variant="caption" italic className="mt-2">
                        Note: {item.note}
                      </Typography>
                    ) : null}
                  </Pressable>
                  <View className="mt-3 flex-row gap-4">
                    <Pressable onPress={() => setNoteTarget(item)}>
                      <Typography variant="caption" className="normal-case">
                        {item.note ? 'Edit note' : 'Add note'}
                      </Typography>
                    </Pressable>
                    <Pressable onPress={() => confirmRemove(item)}>
                      <Typography variant="caption" className="normal-case text-error">
                        Remove
                      </Typography>
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      <NotePromptModal
        visible={noteTarget !== null}
        title={noteTarget?.note ? 'Edit note' : 'Add note'}
        initialValue={noteTarget?.note ?? ''}
        onSave={(note) => {
          if (noteTarget) updateNote(noteTarget.id, note);
        }}
        onClose={() => setNoteTarget(null)}
      />
    </ScreenShell>
  );
}
