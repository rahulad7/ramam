import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, type Href } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Typography } from '@/components/ui/Typography';
import { THEME_COLORS } from '@/constants/theme';
import { useHardwareBack } from '@/hooks/useHardwareBack';
import { navigateBack, navigateToParent } from '@/lib/navigation';

type StackHeaderProps = {
  title: string;
  fallback: Href;
  /** When true, always pops to the parent route instead of following history. */
  parentOnly?: boolean;
  /** How to reach the parent when parentOnly is set. */
  parentMode?: 'replace' | 'pop';
};

export function StackHeader({
  title,
  fallback,
  parentOnly = false,
  parentMode = 'pop',
}: StackHeaderProps) {
  const insets = useSafeAreaInsets();
  const { returnTo } = useLocalSearchParams<{ returnTo?: string }>();
  const handleBack = useCallback(() => {
    if (parentOnly) {
      navigateToParent(fallback, returnTo, parentMode);
      return;
    }

    navigateBack(fallback, returnTo);
  }, [fallback, parentMode, parentOnly, returnTo]);

  useHardwareBack(handleBack);

  return (
    <View
      className="border-b border-outline-variant bg-background"
      style={{ paddingTop: insets.top }}
    >
      <View className="h-14 flex-row items-center px-2">
        <Pressable className="h-10 w-10 items-center justify-center" onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color={THEME_COLORS.icon} />
        </Pressable>
        <Typography
          variant="label-sm"
          className="ml-2 flex-1 normal-case tracking-widest"
          numberOfLines={1}
        >
          {title}
        </Typography>
      </View>
    </View>
  );
}
