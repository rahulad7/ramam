import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { KANDAS } from '@/constants/kandas';
import type { SearchResult } from '@/lib/search';

type SearchResultCardProps = {
  result: SearchResult;
  onPress?: () => void;
};

export function SearchResultCard({ result, onPress }: SearchResultCardProps) {
  const kandaName = KANDAS.find((item) => item.id === result.kanda)?.name ?? result.kanda;

  return (
    <Pressable
      className="border border-outline-variant bg-surface-low px-4 py-4 active:bg-surface-container"
      onPress={() => {
        onPress?.();
        router.push(`/library/${result.kanda}/${result.sarga}` as never);
      }}
    >
      <Typography variant="label-sm" className="normal-case tracking-normal">
        {kandaName} · Chapter {result.sarga}
      </Typography>
      <Typography variant="body" className="mt-2">
        {result.title}
      </Typography>
      <Typography variant="caption" className="mt-2 leading-5">
        {result.excerpt}
      </Typography>
    </Pressable>
  );
}
