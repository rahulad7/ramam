import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import { ReadingHeader } from '@/components/layout/ReadingHeader';
import { RenderContent } from '@/components/reading/RenderContent';
import { HtmlText } from '@/components/reading/HtmlText';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Typography } from '@/components/ui/Typography';
import { useNavigateSarga } from '@/hooks/useNavigateSarga';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { useSarga } from '@/hooks/useSarga';
import type { TKanda } from '@/types/content';

export default function SargaScreen() {
  const { kanda, sarga } = useLocalSearchParams<{ kanda: TKanda; sarga: string }>();
  const { sarga: chapter, error } = useSarga(kanda, sarga);
  const { setLastRead } = useReadingProgress();
  const sargaNum = Number(sarga);
  const { prevHref, nextHref } = useNavigateSarga(kanda, sargaNum);

  useEffect(() => {
    if (kanda && sarga) {
      setLastRead(kanda, sarga);
    }
  }, [kanda, sarga, setLastRead]);

  if (error || !chapter) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <Typography variant="body">Chapter not found.</Typography>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <ReadingHeader kanda={kanda} sarga={sarga} />

      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-10">
        <Typography variant="headline" className="mt-4">
          {chapter.title}
        </Typography>

        <Divider />

        <HtmlText html={chapter.overview} italic />

        <Divider />

        {chapter.content.map((block, index) => (
          <RenderContent key={`${chapter.id}-${index}`} {...block} />
        ))}

        <View className="mt-8 gap-3">
          <Button label="Previous" variant="secondary" onPress={() => router.push(prevHref as never)} />
          <Button label="Next" variant="primary" onPress={() => router.push(nextHref as never)} />
        </View>
      </ScrollView>
    </View>
  );
}
