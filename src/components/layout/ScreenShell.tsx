import { type ReactNode } from 'react';
import { View } from 'react-native';

import { AppHeader } from '@/components/layout/AppHeader';

type ScreenShellProps = {
  children: ReactNode;
  showHeader?: boolean;
};

export function ScreenShell({ children, showHeader = true }: ScreenShellProps) {
  return (
    <View className="flex-1 bg-background">
      {showHeader ? <AppHeader /> : null}
      {children}
    </View>
  );
}
