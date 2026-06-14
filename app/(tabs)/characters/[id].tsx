import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Typography } from '@/components/ui/Typography';
import { getCharacter, ROLE_LABELS } from '@/constants/characters';
import { KANDAS } from '@/constants/kandas';
import { THEME_COLORS } from '@/constants/theme';
import { goBackOr } from '@/lib/navigation';
import { useTheme } from '@/hooks/useTheme';

export default function CharacterDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const character = id ? getCharacter(id) : undefined;
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();
  const colors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;

  if (!character) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <Typography variant="body">Character not found.</Typography>
      </View>
    );
  }

  const kandaName = KANDAS.find((k) => k.id === character.kanda)?.name ?? character.kanda;

  return (
    <View className="flex-1 bg-background">
      <View className="border-b border-outline-variant bg-background" style={{ paddingTop: insets.top }}>
        <View className="h-14 flex-row items-center px-2">
          <Pressable
            className="h-10 w-10 items-center justify-center"
            onPress={() => goBackOr('/(tabs)/characters')}
          >
            <Ionicons name="chevron-back" size={24} color={colors.icon} />
          </Pressable>
          <Typography variant="label-sm" className="ml-2 normal-case tracking-widest">
            {character.name}
          </Typography>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="pb-10">
        <Image
          source={character.image}
          className="h-80 w-full"
          resizeMode="cover"
          accessibilityLabel={character.name}
        />

        <View className="px-5 pt-6">
          <Typography variant="label-sm">{ROLE_LABELS[character.role]}</Typography>
          <Typography variant="headline" className="mt-2">
            {character.name}
          </Typography>
          <Typography variant="caption" italic className="mt-2">
            {character.epithet}
          </Typography>

          <Divider />

          <Typography variant="body-lg" className="leading-7">
            {character.bio}
          </Typography>

          <Divider />

          <Typography variant="label-sm">Traits</Typography>
          <View className="mt-3 flex-row flex-wrap gap-2">
            {character.traits.map((trait) => (
              <View key={trait} className="border border-outline-variant px-3 py-2">
                <Typography variant="caption" className="normal-case">
                  {trait}
                </Typography>
              </View>
            ))}
          </View>

          <Divider />

          <Typography variant="label-sm">Enter the epic</Typography>
          <Typography variant="caption" className="mt-2 leading-6">
            Start reading where {character.name} is central — {kandaName}, Chapter {character.startSarga}.
          </Typography>

          <View className="mt-6">
            <Button
              label={`Read ${kandaName}`}
              onPress={() =>
                router.push(`/library/${character.kanda}/${character.startSarga}` as never)
              }
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
