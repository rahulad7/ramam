import { ScrollView, View } from 'react-native';

import { BackLink } from '@/components/layout/BackLink';
import { ScreenShell } from '@/components/layout/ScreenShell';
import { HtmlText } from '@/components/reading/HtmlText';
import { ReflectionCard } from '@/components/reading/ReflectionCard';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Typography } from '@/components/ui/Typography';
import { getDailyWisdom } from '@/lib/dailyWisdom';
import { openChapter } from '@/lib/navigation';
import { routes } from '@/lib/routes';
import { shareText } from '@/lib/share';

export default function DailyWisdomScreen() {
  const daily = getDailyWisdom();

  if (!daily) {
    return (
      <ScreenShell>
        <View className="flex-1 items-center justify-center px-6">
          <Typography variant="body">Unable to load today&apos;s wisdom.</Typography>
        </View>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell>
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-10">
        <BackLink fallback={routes.home} />

        <Typography variant="label-sm" className="mt-4">
          Daily Dispatch
        </Typography>
        <Typography variant="headline" className="mt-2">
          Issue No. {daily.issueNumber}
        </Typography>
        <Typography variant="caption" className="mt-2">
          {daily.kandaName} · Chapter {daily.sarga}
        </Typography>

        <Divider />

        <View className="border border-outline-variant bg-surface-low p-5">
          <Typography variant="label-sm">Verse of the Day</Typography>
          <Typography variant="headline-sm" className="mt-4">
            {daily.title}
          </Typography>
          <View className="mt-4">
            <HtmlText html={daily.verseHtml} />
          </View>
        </View>

        <Divider />

        <ReflectionCard reflection={daily.reflection} />

        <Divider />

        <Typography variant="label-sm">Editor&apos;s Note</Typography>
        <Typography variant="body" className="mt-3 leading-6">
          {daily.overview}
        </Typography>

        <View className="mt-6 gap-3">
          <Button
            label="Read chapter"
            onPress={() =>
              openChapter(daily.kanda, daily.sarga, { returnTo: routes.dailyWisdom })
            }
          />
          <Button
            label="Share verse"
            variant="secondary"
            onPress={() => shareText(daily.title, daily.versePlain)}
          />
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
