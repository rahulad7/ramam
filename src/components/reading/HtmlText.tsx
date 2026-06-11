import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml, { type MixedStyleDeclaration } from 'react-native-render-html';

type HtmlTextProps = {
  html: string;
  className?: string;
  italic?: boolean;
};

const baseStyle: MixedStyleDeclaration = {
  fontFamily: 'LibreFranklin_400Regular',
  fontSize: 16,
  lineHeight: 28,
  color: '#1c1b1b',
};

const emStyle: MixedStyleDeclaration = {
  fontStyle: 'italic',
  color: '#4d4540',
};

export function HtmlText({ html, italic = false }: HtmlTextProps) {
  const { width } = useWindowDimensions();
  const contentWidth = width - 40;

  const source = useMemo(() => ({ html: `<div>${html}</div>` }), [html]);

  return (
    <RenderHtml
      contentWidth={contentWidth}
      source={source}
      baseStyle={{
        ...baseStyle,
        fontStyle: italic ? 'italic' : 'normal',
        color: italic ? '#4d4540' : '#1c1b1b',
      }}
      tagsStyles={{
        em: emStyle,
        i: emStyle,
        p: { marginTop: 0, marginBottom: 12 },
      }}
      defaultTextProps={{ selectable: true }}
    />
  );
}
