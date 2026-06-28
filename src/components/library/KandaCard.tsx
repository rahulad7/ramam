import { memo } from 'react';
import { Image, Pressable, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import type { KandaMeta } from '@/types/content';

type KandaCardProps = {
  kanda: KandaMeta;
  progress: number;
  onPress: () => void;
  compact?: boolean;
};

export const KandaCard = memo(function KandaCard({ kanda, progress, onPress, compact = false }: KandaCardProps) {
  const progressPercent = Math.round(progress * 100);

  return (
    <Pressable
      onPress={onPress}
      className={`border border-outline-variant bg-surface-low active:bg-surface-container ${
        compact ? 'w-44' : 'mb-4'
      }`}
    >
      <Image
        source={kanda.image}
        className={compact ? 'h-28 w-full' : 'h-44 w-full'}
        resizeMode="cover"
        accessibilityLabel={kanda.name}
      />
      <View className={compact ? 'border-t border-outline-variant p-3' : 'px-5 py-6'}>
        <Typography variant="label-sm" className="text-outline">
          {String(kanda.sortOrder).padStart(2, '0')}
        </Typography>
        <Typography variant={compact ? 'body' : 'headline-sm'} className="mt-2" numberOfLines={compact ? 2 : undefined}>
          {kanda.name}
        </Typography>
        {!compact ? (
          <>
            <Typography variant="label-sm" className="mt-1 normal-case tracking-normal">
              {kanda.subtitle}
            </Typography>
            <Typography variant="caption" className="mt-3 leading-6">
              {kanda.description}
            </Typography>
          </>
        ) : (
          <Typography variant="caption" className="mt-1 normal-case">
            {progressPercent}%
          </Typography>
        )}

        {!compact ? (
          <View className="mt-5">
            <View className="h-1 bg-surface-high rounded-full overflow-hidden">
              <View className="h-full bg-primary" style={{ width: `${progressPercent}%` }} />
            </View>
            <Typography variant="label-sm" className="mt-2 normal-case tracking-normal">
              Progress {progressPercent}%
            </Typography>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
});
