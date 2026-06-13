import { router } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

import { ScreenShell } from '@/components/layout/ScreenShell';
import { Divider } from '@/components/ui/Divider';
import { Typography } from '@/components/ui/Typography';
import { KANDAS } from '@/constants/kandas';
import { useHighlights } from '@/hooks/useHighlights';

export default function HighlightsScreen() {
  const { highlights, removeHighlight } = useHighlights();

  return (
    <ScreenShell>
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-10">
        <Typography variant="label-sm">Your Study</Typography>
        <Typography variant="headline" className="mt-2">
          Highlights
        </Typography>
        <Typography variant="caption" className="mt-3 leading-6">
          Tap the color icon while reading to save a passage. Long press to remove.
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
                <Pressable
                  key={item.id}
                  className="border border-outline-variant bg-surface-low px-4 py-4 active:bg-surface-container"
                  onPress={() => router.push(`/library/${item.kanda}/${item.sarga}` as never)}
                  onLongPress={() => removeHighlight(item.id)}
                >
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
              );
            })}
          </View>
        )}
      </ScrollView>
    </ScreenShell>
  );
}
