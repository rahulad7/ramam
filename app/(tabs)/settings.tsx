import { Alert, Pressable, ScrollView, View } from 'react-native';

import { ScreenShell } from '@/components/layout/ScreenShell';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Typography } from '@/components/ui/Typography';
import type { FontSize } from '@/types/settings';
import { goBackOr } from '@/lib/navigation';
import { useResetAppData } from '@/hooks/useResetAppData';
import { useReadingSettings } from '@/hooks/useReadingSettings';
import { useTheme } from '@/hooks/useTheme';

const FONT_OPTIONS: { value: FontSize; label: string }[] = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
];

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const { settings, setFontSize } = useReadingSettings();
  const resetAppData = useResetAppData();

  async function clearAllData() {
    Alert.alert(
      'Clear all data?',
      'This removes bookmarks, highlights, progress, and search history from this device.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await resetAppData();
            Alert.alert('Done', 'All local reading data has been cleared.');
          },
        },
      ]
    );
  }

  return (
    <ScreenShell>
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-10">
        <Pressable onPress={() => goBackOr('/(tabs)/profile')} className="mt-2">
          <Typography variant="caption">← Back</Typography>
        </Pressable>

        <Typography variant="label-sm" className="mt-4">
          Preferences
        </Typography>
        <Typography variant="headline" className="mt-2">
          Settings
        </Typography>

        <Divider />

        <Typography variant="label-sm">Reading size</Typography>
        <View className="mt-3 flex-row gap-2">
          {FONT_OPTIONS.map((option) => (
            <Pressable
              key={option.value}
              className={`flex-1 border px-3 py-3 ${
                settings.fontSize === option.value
                  ? 'border-primary bg-surface-container'
                  : 'border-outline-variant bg-surface-low'
              }`}
              onPress={() => setFontSize(option.value)}
            >
              <Typography variant="caption" className="text-center normal-case">
                {option.label}
              </Typography>
            </Pressable>
          ))}
        </View>

        <Divider />

        <Typography variant="label-sm">Appearance</Typography>
        <Typography variant="caption" className="mt-2">
          Theme: {theme}
        </Typography>
        <View className="mt-4">
          <Button
            label={`Use ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            variant="secondary"
            onPress={toggleTheme}
          />
        </View>

        <Divider />

        <Typography variant="label-sm">Data</Typography>
        <Typography variant="caption" className="mt-2 leading-6">
          All reading data is stored locally on this device. No account required.
        </Typography>
        <View className="mt-4">
          <Button label="Clear local data" variant="secondary" onPress={clearAllData} />
        </View>

        <Divider />

        <Typography variant="caption" className="leading-6">
          Ramam ships with the full Valmiki Ramayana offline. Content lives in the app bundle — no
          internet needed to read.
        </Typography>
      </ScrollView>
    </ScreenShell>
  );
}
