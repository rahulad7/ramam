import { router } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { Typography } from '@/components/ui/Typography';
import { APP_EST, APP_NAME, APP_TAGLINE } from '@/constants/kandas';

function LogoMark() {
  return (
    <View className="mb-8 h-16 w-16 items-center justify-center border border-primary">
      <View className="w-8 gap-1.5">
        <View className="h-px w-full bg-primary" />
        <View className="h-px w-3/4 bg-primary" />
        <View className="h-px w-full bg-primary" />
      </View>
    </View>
  );
}

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-background px-8">
      <Animated.View entering={FadeIn.duration(800)} className="items-center">
        <LogoMark />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(700)} className="items-center">
        <Typography variant="label" className="mb-4 tracking-[0.35em]">
          {APP_NAME.toUpperCase()}
        </Typography>
        <Typography variant="display" italic className="text-center text-4xl">
          {APP_NAME}
        </Typography>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(650).duration(700)}>
        <Typography variant="caption" italic className="mt-4 text-center text-on-surface-variant">
          {APP_TAGLINE}
        </Typography>
      </Animated.View>

      <Animated.View
        entering={FadeIn.delay(1100).duration(600)}
        className="absolute bottom-16 items-center"
      >
        <View className="mb-3 h-px w-24 border-b border-dotted border-outline-variant" />
        <Typography variant="label-sm">{APP_EST}</Typography>
      </Animated.View>
    </View>
  );
}
