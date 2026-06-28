import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
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
import { navigateToParent, openChapterFromHref } from '@/lib/navigation';
import { routes } from '@/lib/routes';
import { shareText } from '@/lib/share';
import { stripHtml } from '@/utils/html';
import type { TKanda } from '@/types/content';

const CHAPTER_REFLECTION =
  'What truth in this chapter asks something of you today?';

export default function SargaScreen() {
  const { kanda, sarga, returnTo, blockIndex } = useLocalSearchParams<{
    kanda: TKanda;
    sarga: string;
    returnTo?: string;
    blockIndex?: string;
  }>();
  const { sarga: chapter, error } = useSarga(kanda, sarga);
  const { setLastRead, saveScrollOffset, getScrollOffset, markChapterOpened } = useReadingProgress();
  const scrollRef = useRef<ScrollView>(null);
  const restoredRef = useRef(false);
  const scrolledToBlockRef = useRef(false);
  const blockOffsetsRef = useRef<Record<number, number>>({});
  const leavingRef = useRef(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const sargaNum = Number(sarga);
  const { prevHref, nextHref, hasPrevious, hasNext } = useNavigateSarga(kanda, sargaNum);
  const targetBlockIndex = blockIndex ? Number(blockIndex) : null;

  useEffect(() => {
    if (!kanda || !sarga) return;
    setLastRead(kanda, sarga);
    markChapterOpened(kanda, sarga);
  }, [kanda, sarga, setLastRead, markChapterOpened]);

  useEffect(() => {
    restoredRef.current = false;
    scrolledToBlockRef.current = false;
    blockOffsetsRef.current = {};
    leavingRef.current = false;
    setIsLeaving(false);
  }, [kanda, sarga, blockIndex]);

  const handleBack = useCallback(() => {
    if (leavingRef.current || !kanda) return;

    leavingRef.current = true;
    setIsLeaving(true);

    // Drop heavy HTML first, then navigate on the next frame for a snappy transition.
    requestAnimationFrame(() => {
      navigateToParent(routes.kanda(kanda), returnTo);
    });
  }, [kanda, returnTo]);

  const scrollToTargetBlock = useCallback(() => {
    if (targetBlockIndex === null || scrolledToBlockRef.current) return;

    const offset = blockOffsetsRef.current[targetBlockIndex];
    if (offset === undefined) return;

    scrolledToBlockRef.current = true;
    scrollRef.current?.scrollTo({ y: Math.max(0, offset - 16), animated: true });
  }, [targetBlockIndex]);

  const handleBlockLayout = useCallback(
    (index: number, y: number) => {
      blockOffsetsRef.current[index] = y;
      if (index === targetBlockIndex) {
        requestAnimationFrame(scrollToTargetBlock);
      }
    },
    [scrollToTargetBlock, targetBlockIndex]
  );

  function restoreScrollPosition() {
    if (!kanda || !sarga || restoredRef.current || targetBlockIndex !== null) return;

    const offset = getScrollOffset(kanda, sarga);
    if (offset <= 0) return;

    restoredRef.current = true;
    scrollRef.current?.scrollTo({ y: offset, animated: false });
  }

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (!kanda || !sarga || isLeaving) return;
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
        returnTo={returnTo}
        onBack={handleBack}
        onShare={() => shareText(chapter.title, shareMessage)}
      />

      {isLeaving ? (
        <View className="flex-1 bg-background" />
      ) : (
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

          <View>
            {chapter.content.map((block, index) => (
              <View
                key={`${chapter.id}-${index}`}
                onLayout={(event) => handleBlockLayout(index, event.nativeEvent.layout.y)}
              >
                <HighlightableBlock
                  kanda={kanda}
                  sarga={sarga}
                  blockIndex={index}
                  {...block}
                />
              </View>
            ))}
          </View>

          <ReflectionCard reflection={CHAPTER_REFLECTION} />

          <View className="mt-8 gap-3">
            {hasPrevious && prevHref ? (
              <Button
                label="Previous"
                variant="secondary"
                onPress={() =>
                  openChapterFromHref(prevHref, returnTo ? { returnTo } : undefined)
                }
              />
            ) : null}
            {hasNext && nextHref ? (
              <Button
                label="Next"
                variant="primary"
                onPress={() =>
                  openChapterFromHref(nextHref, returnTo ? { returnTo } : undefined)
                }
              />
            ) : null}
          </View>
        </ScrollView>
      )}
    </ThemedView>
  );
}
