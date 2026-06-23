import { vars } from 'nativewind';
import { useMemo } from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

import { THEME_CSS_VARS } from '@/constants/themeVars';
import { useTheme } from '@/hooks/useTheme';

type ThemedViewProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
};

export function ThemedView({ style, ...props }: ThemedViewProps) {
  const { isDark } = useTheme();
  const themeStyle = useMemo(
    () => vars(isDark ? THEME_CSS_VARS.dark : THEME_CSS_VARS.light),
    [isDark]
  );

  return <View {...props} style={[themeStyle, style]} />;
}
