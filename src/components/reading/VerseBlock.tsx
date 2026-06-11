import { View } from 'react-native';

import { HtmlText } from '@/components/reading/HtmlText';

type VerseBlockProps = {
  text: string;
};

export function VerseBlock({ text }: VerseBlockProps) {
  return (
    <View className="mb-4">
      <HtmlText html={text} />
    </View>
  );
}
