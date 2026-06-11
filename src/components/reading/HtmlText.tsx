import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml, { type MixedStyleDeclaration } from 'react-native-render-html';

import { THEME_COLORS } from '@/constants/theme';
import { useTheme } from '@/hooks/useTheme';

type HtmlTextProps = {
  html: string;
  className?: string;
  italic?: boolean;
};

export function HtmlText({ html, italic = false }: HtmlTextProps) {
  const { width } = useWindowDimensions();
  const { isDark } = useTheme();
  const palette = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
  const contentWidth = width - 40;

  const source = useMemo(() => ({ html: `<div>${html}</div>` }), [html]);

  const baseStyle: MixedStyleDeclaration = useMemo(
    () => ({
      fontFamily: 'LibreFranklin_400Regular',
      fontSize: 16,
      lineHeight: 28,
      color: palette.htmlBody,
      fontStyle: italic ? 'italic' : 'normal',
    }),
    [italic, palette.htmlBody]
  );

  const emStyle: MixedStyleDeclaration = useMemo(
    () => ({
      fontStyle: 'italic',
      color: palette.htmlEmphasis,
    }),
    [palette.htmlEmphasis]
  );

  return (
    <RenderHtml
      contentWidth={contentWidth}
      source={source}
      baseStyle={baseStyle}
      tagsStyles={{
        em: emStyle,
        i: emStyle,
        p: { marginTop: 0, marginBottom: 12 },
      }}
      defaultTextProps={{ selectable: true }}
    />
  );
}
