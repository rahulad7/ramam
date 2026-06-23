import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { ScrollView, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';

import { ReadingHeader } from '@/components/layout/ReadingHeader';
import { HighlightableBlock } from '@/components/reading/HighlightableBlock';
import { HtmlText } from '@/components/reading/HtmlText';
import { ReflectionCard } from '@/components/reading/ReflectionCard';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { ThemedView } from '@/components/ui/ThemedView';
import { Typography } from '@/components/ui/Typography';
import { useNavigateSarga } from '@/hooks/useNavigateSarga';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { useSarga } from '@/hooks/useSarga';
import { openScreen } from '@/lib/navigation';
import { shareText } from '@/lib/share';
import { stripHtml } from '@/utils/html';
import type { TKanda } from '@/types/content';

const CHAPTER_REFLECTION =
  'What truth in this chapter asks something of you today?';

export default function SargaScreen() {
  const { kanda, sarga } = useLocalSearchParams<{ kanda: TKanda; sarga: string }>();
  const { sarga: chapter, error } = useSarga(kanda, sarga);
  const { setLastRead, saveScrollOffset, getScrollOffset, markChapterOpened } = useReadingProgress();
  const scrollRef = useRef<ScrollView>(null);
  const restoredRef = useRef(false);
  const sargaNum = Number(sarga);
  const { prevHref, nextHref, hasPrevious, hasNext } = useNavigateSarga(kanda, sargaNum);

  useEffect(() => {
    if (!kanda || !sarga) return;
    setLastRead(kanda, sarga);
    markChapterOpened(kanda, sarga);
  }, [kanda, sarga, setLastRead, markChapterOpened]);

  useEffect(() => {
    restoredRef.current = false;
  }, [kanda, sarga]);

  function restoreScrollPosition() {
    if (!kanda || !sarga || restoredRef.current) return;

    const offset = getScrollOffset(kanda, sarga);
    if (offset <= 0) return;

    restoredRef.current = true;
    scrollRef.current?.scrollTo({ y: offset, animated: false });
  }

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (!kanda || !sarga) return;
    saveScrollOffset(kanda, sarga, event.nativeEvent.contentOffset.y);
  }

  if (error || !chapter) {
    return (
      <ThemedView className="flex-1 items-center justify-center bg-background px-6">
        <Typography variant="body">Chapter not found.</Typography>
      </ThemedView>
    );
  }

  const shareMessage = `${chapter.title}\n\n${stripHtml(chapter.overview).slice(0, 400)}`;

  return (
    <ThemedView className="flex-1 bg-background">
      <ReadingHeader
        kanda={kanda}
        sarga={sarga}
        onShare={() => shareText(chapter.title, shareMessage)}
      />

      <ScrollView
        ref={scrollRef}
        className="flex-1"
        contentContainerClassName="px-5 pb-10"
        onScroll={handleScroll}
        scrollEventThrottle={120}
        onContentSizeChange={restoreScrollPosition}
        onLayout={restoreScrollPosition}
      >
        <Typography variant="headline" className="mt-4">
          {chapter.title}
        </Typography>

        <Divider />

        <HtmlText html={chapter.overview} italic />

        <Divider />

        {chapter.content.map((block, index) => (
          <HighlightableBlock
            key={`${chapter.id}-${index}`}
            kanda={kanda}
            sarga={sarga}
            blockIndex={index}
            {...block}
          />
        ))}

        <ReflectionCard reflection={CHAPTER_REFLECTION} />

        <View className="mt-8 gap-3">
          {hasPrevious && prevHref ? (
            <Button
              label="Previous"
              variant="secondary"
              onPress={() => openScreen(prevHref)}
            />
          ) : null}
          {hasNext && nextHref ? (
            <Button label="Next" variant="primary" onPress={() => openScreen(nextHref)} />
          ) : null}
        </View>
      </ScrollView>
    </ThemedView>
  );
}
