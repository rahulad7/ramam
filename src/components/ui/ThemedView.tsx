import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

import { themeVars } from '@/constants/themeVars';

type ThemedViewProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
};

export function ThemedView({ style, ...props }: ThemedViewProps) {
  return <View {...props} style={[themeVars, style]} />;
}
