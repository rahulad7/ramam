import { memo } from 'react';
import { Pressable } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { KANDAS } from '@/constants/kandas';
import { openChapter } from '@/lib/navigation';
import { routes } from '@/lib/routes';
import type { SearchResult } from '@/lib/search';

type SearchResultCardProps = {
  result: SearchResult;
  onPress?: () => void;
};

export const SearchResultCard = memo(function SearchResultCard({
  result,
  onPress,
}: SearchResultCardProps) {
  const kandaName = KANDAS.find((item) => item.id === result.kanda)?.name ?? result.kanda;

  return (
    <Pressable
      className="border border-outline-variant bg-surface-low px-4 py-4 active:bg-surface-container"
      onPress={() => {
        onPress?.();
        openChapter(result.kanda, result.sarga, { returnTo: routes.search });
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
});
