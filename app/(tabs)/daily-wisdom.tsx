import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Masthead } from '@/components/layout/Masthead';
import { HtmlText } from '@/components/reading/HtmlText';
import { Divider } from '@/components/ui/Divider';
import { Typography } from '@/components/ui/Typography';
import { getSarga } from '@/lib/content';

const featured = getSarga('bala', '1');
const featuredVerse = featured?.content.find((block) => block.type === 'verse');

export default function DailyWisdomScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-10">
        <Masthead subtitle="A daily verse for reflection." />

        <View className="mt-8 border border-outline-variant bg-surface-low p-5">
          <Typography variant="label-sm">Verse of the Day</Typography>
          <Typography variant="headline-sm" className="mt-4">
            The Essence of Ethical Conduct
          </Typography>
          {featuredVerse ? <HtmlText html={featuredVerse.text} className="mt-4" /> : null}
        </View>

        <Divider />

        <Typography variant="label-sm">Reflection</Typography>
        <Typography variant="body-lg" className="mt-3 leading-7">
          How does the pursuit of dharma shape the choices we make when duty and desire pull in different
          directions?
        </Typography>

        <Divider />

        <Typography variant="caption" className="leading-6">
          {featured?.overview}
        </Typography>
      </ScrollView>
    </SafeAreaView>
  );
}
