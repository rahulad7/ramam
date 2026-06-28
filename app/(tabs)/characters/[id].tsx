import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, View } from 'react-native';

import { StackHeader } from '@/components/layout/StackHeader';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { ThemedView } from '@/components/ui/ThemedView';
import { Typography } from '@/components/ui/Typography';
import { getCharacter, ROLE_LABELS } from '@/constants/characters';
import { KANDAS } from '@/constants/kandas';
import { openChapter } from '@/lib/navigation';
import { routes } from '@/lib/routes';

export default function CharacterDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const character = id ? getCharacter(id) : undefined;

  if (!character) {
    return (
      <ThemedView className="flex-1 items-center justify-center bg-background px-6">
        <Typography variant="body">Character not found.</Typography>
      </ThemedView>
    );
  }

  const kandaName = KANDAS.find((k) => k.id === character.kanda)?.name ?? character.kanda;

  return (
    <ThemedView className="flex-1 bg-background">
      <StackHeader title={character.name} fallback={routes.characters} />

      <ScrollView className="flex-1" contentContainerClassName="pb-10">
        <View className="h-80 w-full overflow-hidden">
          <Image
            source={character.image}
            className="h-full w-full"
            resizeMode="cover"
            accessibilityLabel={character.name}
          />
        </View>

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
                openChapter(character.kanda, character.startSarga, {
                  returnTo: routes.character(character.id),
                })
              }
            />
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
