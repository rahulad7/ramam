import { useLocalSearchParams, type Href } from 'expo-router';
import { useCallback } from 'react';
import { Pressable } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useHardwareBack } from '@/hooks/useHardwareBack';
import { navigateBack } from '@/lib/navigation';

type BackLinkProps = {
  fallback: Href;
  label?: string;
  className?: string;
};

export function BackLink({ fallback, label = '← Back', className = 'mt-2' }: BackLinkProps) {
  const { returnTo } = useLocalSearchParams<{ returnTo?: string }>();
  const handleBack = useCallback(() => navigateBack(fallback, returnTo), [fallback, returnTo]);

  useHardwareBack(handleBack);

  return (
    <Pressable onPress={handleBack} className={className}>
      <Typography variant="caption">{label}</Typography>
    </Pressable>
  );
}
