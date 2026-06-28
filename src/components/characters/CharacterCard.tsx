import { memo } from 'react';
import { Image, Pressable, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { ROLE_LABELS, type CharacterMeta } from '@/constants/characters';

type CharacterCardProps = {
  character: CharacterMeta;
  onPress: () => void;
  compact?: boolean;
};

export const CharacterCard = memo(function CharacterCard({
  character,
  onPress,
  compact = false,
}: CharacterCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`border border-outline-variant bg-surface-low active:bg-surface-container ${
        compact ? 'w-36' : 'w-full'
      }`}
    >
      <View className={`overflow-hidden ${compact ? 'h-40' : 'h-52'}`}>
        <Image
          source={character.image}
          className="h-full w-full"
          resizeMode="cover"
          accessibilityLabel={character.name}
        />
      </View>
      <View className="border-t border-outline-variant p-3">
        <Typography variant="label-sm" className="normal-case tracking-normal">
          {ROLE_LABELS[character.role]}
        </Typography>
        <Typography variant="body" className="mt-1">
          {character.name}
        </Typography>
        {!compact ? (
          <Typography variant="caption" className="mt-1 leading-5" numberOfLines={2}>
            {character.summary}
          </Typography>
        ) : null}
      </View>
    </Pressable>
  );
});
