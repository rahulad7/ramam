import { Pressable, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import type { KandaMeta } from '@/types/content';

type KandaCardProps = {
  kanda: KandaMeta;
  progress: number;
  onPress: () => void;
};

export function KandaCard({ kanda, progress, onPress }: KandaCardProps) {
  const progressPercent = Math.round(progress * 100);

  return (
    <Pressable
      onPress={onPress}
      className="border border-outline-variant bg-surface-low px-5 py-6 mb-4 active:bg-surface-container"
    >
      <Typography variant="label-sm" className="text-outline">
        {String(kanda.sortOrder).padStart(2, '0')}
      </Typography>
      <Typography variant="headline-sm" className="mt-2">
        {kanda.name}
      </Typography>
      <Typography variant="label-sm" className="mt-1 normal-case tracking-normal">
        {kanda.subtitle}
      </Typography>
      <Typography variant="caption" className="mt-3 leading-6">
        {kanda.description}
      </Typography>

      <View className="mt-5">
        <View className="h-1 bg-surface-high rounded-full overflow-hidden">
          <View className="h-full bg-primary" style={{ width: `${progressPercent}%` }} />
        </View>
        <Typography variant="label-sm" className="mt-2 normal-case tracking-normal">
          Progress {progressPercent}%
        </Typography>
      </View>
    </Pressable>
  );
}
