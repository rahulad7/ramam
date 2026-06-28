import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, TextInput, View } from 'react-native';

import { SearchResultCard } from '@/components/search/SearchResultCard';
import { ScreenShell } from '@/components/layout/ScreenShell';
import { Divider } from '@/components/ui/Divider';
import { Typography } from '@/components/ui/Typography';
import { KANDAS } from '@/constants/kandas';
import { THEME_COLORS } from '@/constants/theme';
import { useRecentSearches } from '@/hooks/useRecentSearches';
import { useSearch } from '@/hooks/useSearch';
import type { SearchResult } from '@/lib/search';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const { results, isSearching, hasQuery } = useSearch(query);
  const { recent, addRecent, clearRecent } = useRecentSearches();
  const placeholderColor = THEME_COLORS.iconMuted;
  const inputClass = 'font-franklin text-base text-on-surface';

  const handleSubmit = useCallback(() => {
    if (query.trim()) {
      addRecent(query.trim());
    }
  }, [addRecent, query]);

  const renderResult = useCallback(
    ({ item }: { item: SearchResult }) => (
      <SearchResultCard result={item} onPress={() => addRecent(query.trim())} />
    ),
    [addRecent, query]
  );

  const listHeader = (
    <>
      <Typography variant="label-sm">Discover</Typography>
      <Typography variant="headline" className="mt-2">
        Search the Epic
      </Typography>
      <Typography variant="caption" className="mt-3 leading-6">
        Search all {KANDAS.reduce((sum, k) => sum + k.chapterCount, 0)} chapters by title, summary, or
        verse text.
      </Typography>

      <Divider />

      <View className="border border-outline-variant bg-surface-low px-4 py-3">
        <TextInput
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSubmit}
          placeholder="Search chapters, verses, commentary..."
          placeholderTextColor={placeholderColor}
          className={inputClass}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>

      {!hasQuery && recent.length > 0 ? (
        <View className="mt-6">
          <View className="mb-3 flex-row items-center justify-between">
            <Typography variant="label-sm">Recent</Typography>
            <Pressable onPress={clearRecent}>
              <Typography variant="caption">Clear</Typography>
            </Pressable>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {recent.map((item) => (
              <Pressable
                key={item}
                className="border border-outline-variant px-3 py-2 active:bg-surface-container"
                onPress={() => setQuery(item)}
              >
                <Typography variant="caption" className="normal-case">
                  {item}
                </Typography>
              </Pressable>
            ))}
          </View>
        </View>
      ) : null}

      {hasQuery ? (
        <View className="mt-6">
          {isSearching ? (
            <ActivityIndicator className="mt-4" color={THEME_COLORS.icon} />
          ) : results.length === 0 ? (
            <Typography variant="body" className="mt-2 text-on-surface-variant">
              No chapters matched &quot;{query.trim()}&quot;. Try a shorter phrase or another spelling.
            </Typography>
          ) : (
            <Typography variant="label-sm" className="mb-4">
              {results.length} result{results.length === 1 ? '' : 's'}
            </Typography>
          )}
        </View>
      ) : query.trim().length === 1 ? (
        <Typography variant="caption" className="mt-6 leading-6">
          Type at least 2 characters to search.
        </Typography>
      ) : (
        <Typography variant="caption" className="mt-6 leading-6">
          Try names like Rama, Sita, Hanuman, or themes like dharma and exile.
        </Typography>
      )}
    </>
  );

  return (
    <ScreenShell>
      <FlatList
        data={hasQuery && !isSearching ? results : []}
        keyExtractor={(item) => item.id}
        renderItem={renderResult}
        ListHeaderComponent={listHeader}
        contentContainerClassName="px-5 pb-10"
        keyboardShouldPersistTaps="handled"
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        windowSize={7}
        removeClippedSubviews
        ItemSeparatorComponent={() => <View className="h-3" />}
      />
    </ScreenShell>
  );
}
