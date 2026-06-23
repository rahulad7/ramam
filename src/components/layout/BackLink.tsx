import type { Href } from 'expo-router';
import { useCallback } from 'react';
import { Pressable } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useHardwareBack } from '@/hooks/useHardwareBack';
import { goBackOr } from '@/lib/navigation';

type BackLinkProps = {
  fallback: Href;
  label?: string;
  className?: string;
};

export function BackLink({ fallback, label = '← Back', className = 'mt-2' }: BackLinkProps) {
  const handleBack = useCallback(() => goBackOr(fallback), [fallback]);

  useHardwareBack(handleBack);

  return (
    <Pressable onPress={handleBack} className={className}>
      <Typography variant="caption">{label}</Typography>
    </Pressable>
  );
}
