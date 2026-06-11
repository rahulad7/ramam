import { View } from 'react-native';

import { HtmlText } from '@/components/reading/HtmlText';

type CommentaryBlockProps = {
  text: string;
};

export function CommentaryBlock({ text }: CommentaryBlockProps) {
  return (
    <View className="mb-4 bg-surface-low border border-outline-variant px-4 py-4 rounded-interactive">
      <HtmlText html={text} className="text-on-surface-variant" />
    </View>
  );
}
