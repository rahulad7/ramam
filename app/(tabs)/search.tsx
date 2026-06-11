import { ScrollView, TextInput, View } from 'react-native';

import { ScreenShell } from '@/components/layout/ScreenShell';
import { Divider } from '@/components/ui/Divider';
import { Typography } from '@/components/ui/Typography';

export default function SearchScreen() {
  return (
    <ScreenShell>
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-10">
        <Typography variant="label-sm">Discover</Typography>
        <Typography variant="headline" className="mt-2">
          Search the Epic
        </Typography>
        <Typography variant="caption" className="mt-3 leading-6">
          Full-text search across all 534 chapters arrives in a later phase. For now, browse by kanda
          in the Library tab.
        </Typography>

        <Divider />

        <View className="border border-outline-variant bg-surface-low px-4 py-3">
          <TextInput
            editable={false}
            placeholder="Search chapters, verses, commentary..."
            placeholderTextColor="#7e756f"
            className="font-franklin text-base text-on-surface"
          />
        </View>

        <Typography variant="caption" className="mt-4 text-center">
          Coming soon in Phase 2
        </Typography>
      </ScrollView>
    </ScreenShell>
  );
}
