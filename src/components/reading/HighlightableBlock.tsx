import { Ionicons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

import { RenderContent } from '@/components/reading/RenderContent';
import { Typography } from '@/components/ui/Typography';
import { THEME_COLORS } from '@/constants/theme';
import { useHighlights } from '@/hooks/useHighlights';
import { useTheme } from '@/hooks/useTheme';
import type { SargaBlock, TKanda } from '@/types/content';

type HighlightableBlockProps = SargaBlock & {
  kanda: TKanda;
  sarga: string;
  blockIndex: number;
};

export function HighlightableBlock({ kanda, sarga, blockIndex, type, text }: HighlightableBlockProps) {
  const { isHighlighted, addHighlight, removeHighlight } = useHighlights();
  const { isDark } = useTheme();
  const colors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
  const saved = isHighlighted(kanda, sarga, blockIndex);

  async function toggleHighlight() {
    if (saved) {
      await removeHighlight(`${kanda}-${sarga}-${blockIndex}`);
    } else {
      await addHighlight({ kanda, sarga, blockIndex, blockType: type, text });
    }
  }

  return (
    <View className={`mb-4 ${saved ? 'border-l-2 border-primary bg-surface-low pl-3' : ''}`}>
      <View className="mb-2 flex-row items-center justify-between">
        <Typography variant="label-sm" className="normal-case tracking-normal">
          {type}
        </Typography>
        <Pressable
          accessibilityLabel={saved ? 'Remove highlight' : 'Highlight passage'}
          className="h-8 w-8 items-center justify-center active:opacity-60"
          onPress={toggleHighlight}
        >
          <Ionicons
            name={saved ? 'color-fill' : 'color-fill-outline'}
            size={18}
            color={saved ? colors.icon : colors.iconMuted}
          />
        </Pressable>
      </View>
      <RenderContent type={type} text={text} />
    </View>
  );
}
