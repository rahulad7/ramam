import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml, { type MixedStyleDeclaration } from 'react-native-render-html';

import { FONT_SIZE_STYLES } from '@/constants/reading';
import { THEME_COLORS } from '@/constants/theme';
import { useReadingSettings } from '@/hooks/useReadingSettings';
import { useTheme } from '@/hooks/useTheme';

type HtmlTextProps = {
  html: string;
  className?: string;
  italic?: boolean;
};

export function HtmlText({ html, italic = false }: HtmlTextProps) {
  const { width } = useWindowDimensions();
  const { isDark } = useTheme();
  const { settings } = useReadingSettings();
  const palette = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
  const font = FONT_SIZE_STYLES[settings.fontSize];
  const contentWidth = width - 40;

  const source = useMemo(() => ({ html: `<div>${html}</div>` }), [html]);

  const baseStyle: MixedStyleDeclaration = useMemo(
    () => ({
      fontFamily: 'LibreFranklin_400Regular',
      fontSize: font.fontSize,
      lineHeight: font.lineHeight,
      color: palette.htmlBody,
      fontStyle: italic ? 'italic' : 'normal',
    }),
    [italic, palette.htmlBody, font.fontSize, font.lineHeight]
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
