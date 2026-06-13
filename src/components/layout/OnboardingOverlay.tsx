import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { APP_NAME, APP_TAGLINE } from '@/constants/kandas';
import { STORAGE_KEYS } from '@/constants/storage';

const SLIDES = [
  {
    title: 'Read the complete epic',
    body: 'All 534 chapters of Valmiki Ramayana, organized across six kandas, available offline on your device.',
  },
  {
    title: 'Reflect every day',
    body: 'Daily Wisdom offers a verse and reflection question. Search, bookmark, and highlight passages that speak to you.',
  },
  {
    title: 'Your reading, your pace',
    body: 'Progress, bookmarks, and highlights stay on this device. Pick up where you left off anytime.',
  },
];

export function OnboardingOverlay() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    async function check() {
      const done = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_DONE);
      if (!done) setVisible(true);
    }
    check();
  }, []);

  async function finish() {
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_DONE, 'true');
    setVisible(false);
  }

  function next() {
    if (step >= SLIDES.length - 1) {
      finish();
      return;
    }
    setStep((prev) => prev + 1);
  }

  if (!visible) return null;

  const slide = SLIDES[step];

  return (
    <Modal visible animationType="fade" transparent onRequestClose={finish}>
      <View
        className="flex-1 justify-end bg-black/50"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <View className="mx-4 mb-6 border border-outline-variant bg-background p-6">
          <Typography variant="label-sm">{APP_NAME}</Typography>
          <Typography variant="headline-sm" className="mt-4">
            {slide?.title}
          </Typography>
          <Typography variant="body" className="mt-3 leading-6">
            {slide?.body}
          </Typography>
          <Typography variant="caption" italic className="mt-4">
            {APP_TAGLINE}
          </Typography>

          <View className="mt-6 flex-row gap-2">
            {SLIDES.map((_, index) => (
              <View
                key={index}
                className={`h-1 flex-1 ${index === step ? 'bg-primary' : 'bg-outline-variant'}`}
              />
            ))}
          </View>

          <View className="mt-6 gap-3">
            <Button label={step === SLIDES.length - 1 ? 'Begin reading' : 'Continue'} onPress={next} />
            <Pressable onPress={finish} className="items-center py-2">
              <Typography variant="caption">Skip</Typography>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
