import { type ReactNode } from 'react';
import { StyleSheet } from 'react-native';

import { AppHeader } from '@/components/layout/AppHeader';
import { ThemedView } from '@/components/ui/ThemedView';

type ScreenShellProps = {
  children: ReactNode;
  showHeader?: boolean;
};

export function ScreenShell({ children, showHeader = true }: ScreenShellProps) {
  return (
    <ThemedView style={styles.root}>
      {showHeader ? <AppHeader /> : null}
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
