import { ScrollView, View } from 'react-native';

import { CharacterCard } from '@/components/characters/CharacterCard';
import { BackLink } from '@/components/layout/BackLink';
import { ScreenShell } from '@/components/layout/ScreenShell';
import { Divider } from '@/components/ui/Divider';
import { Typography } from '@/components/ui/Typography';
import { CHARACTERS } from '@/constants/characters';
import { openScreen } from '@/lib/navigation';
import { routes } from '@/lib/routes';

export default function CharactersScreen() {
  return (
    <ScreenShell>
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-10">
        <BackLink fallback={routes.home} />

        <Typography variant="label-sm" className="mt-4">
          The Epic
        </Typography>
        <Typography variant="headline" className="mt-2">
          Characters
        </Typography>
        <Typography variant="caption" className="mt-3 leading-6">
          Meet the figures who shape the Ramayana — tap a portrait to read their story and jump to
          where they enter the epic.
        </Typography>

        <Divider />

        <View className="flex-row flex-wrap justify-between gap-y-4">
          {CHARACTERS.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onPress={() => openScreen(routes.character(character.id))}
            />
          ))}
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
