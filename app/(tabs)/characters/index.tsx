import { useCallback } from 'react';
import { FlatList, View } from 'react-native';

import { CharacterCard } from '@/components/characters/CharacterCard';
import { BackLink } from '@/components/layout/BackLink';
import { ScreenShell } from '@/components/layout/ScreenShell';
import { Divider } from '@/components/ui/Divider';
import { Typography } from '@/components/ui/Typography';
import { CHARACTERS, type CharacterMeta } from '@/constants/characters';
import { openScreen } from '@/lib/navigation';
import { routes } from '@/lib/routes';

function CharactersHeader() {
  return (
    <>
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
    </>
  );
}

export default function CharactersScreen() {
  const renderItem = useCallback(
    ({ item }: { item: CharacterMeta }) => (
      <View className="mb-4 w-1/2 px-1.5">
        <CharacterCard
          character={item}
          onPress={() => openScreen(routes.character(item.id))}
        />
      </View>
    ),
    []
  );

  return (
    <ScreenShell>
      <FlatList
        data={CHARACTERS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderItem}
        ListHeaderComponent={CharactersHeader}
        contentContainerClassName="px-3.5 pb-10"
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        initialNumToRender={6}
        maxToRenderPerBatch={4}
        windowSize={7}
        removeClippedSubviews
      />
    </ScreenShell>
  );
}
