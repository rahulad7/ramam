import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { ThemedView } from '@/components/ui/ThemedView';
import { Typography } from '@/components/ui/Typography';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App error:', error, info.componentStack);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ThemedView className="flex-1 items-center justify-center bg-background px-8">
          <Typography variant="headline-sm" className="text-center">
            Something went wrong
          </Typography>
          <Typography variant="body" className="mt-3 text-center leading-6 text-on-surface-variant">
            The app hit an unexpected error. Try again — your reading data is still saved on this device.
          </Typography>
          <Pressable className="mt-6 border border-primary px-6 py-4" onPress={this.handleRetry}>
            <Typography variant="label-sm" className="normal-case tracking-widest">
              Try again
            </Typography>
          </Pressable>
        </ThemedView>
      );
    }

    return this.props.children;
  }
}
