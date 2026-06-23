import { Image, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';

import { Typography } from '@/components/ui/Typography';
import { SPLASH_IMAGE } from '@/constants/assets';
import { APP_EST, APP_NAME, APP_TAGLINE } from '@/constants/kandas';
import { THEME_COLORS } from '@/constants/theme';
import { themeVars } from '@/constants/themeVars';

export function AnimatedSplash() {
  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(400)}
      style={[styles.root, themeVars, { backgroundColor: THEME_COLORS.background }]}
    >
      <Animated.View entering={FadeIn.duration(800)} className="items-center">
        <Image
          source={SPLASH_IMAGE}
          className="mb-8 h-52 w-52 border border-outline-variant"
          resizeMode="cover"
          accessibilityLabel="Ramayana"
        />
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
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
});
