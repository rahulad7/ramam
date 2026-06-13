import { View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { shareText } from '@/lib/share';

type ReflectionCardProps = {
  reflection: string;
  shareLabel?: string;
};

export function ReflectionCard({ reflection, shareLabel = 'Share reflection' }: ReflectionCardProps) {
  return (
    <View className="mt-8 border border-outline-variant bg-surface-container p-5">
      <Typography variant="label-sm">Daily Reflection</Typography>
      <Typography variant="body-lg" className="mt-3 leading-7">
        {reflection}
      </Typography>
      <View className="mt-4">
        <Button
          label={shareLabel}
          variant="secondary"
          onPress={() => shareText('Ramam Reflection', reflection)}
        />
      </View>
    </View>
  );
}
