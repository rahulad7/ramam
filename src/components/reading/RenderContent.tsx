import { View } from 'react-native';

import { CommentaryBlock } from '@/components/reading/CommentaryBlock';
import { HtmlText } from '@/components/reading/HtmlText';
import { VerseBlock } from '@/components/reading/VerseBlock';
import { Typography } from '@/components/ui/Typography';
import type { SargaBlock } from '@/types/content';

type RenderContentProps = SargaBlock;

export function RenderContent({ type, text }: RenderContentProps) {
  if (type === 'commentary') {
    return <CommentaryBlock text={text} />;
  }

  if (type === 'conceptual') {
    return (
      <View className="mb-4">
        <Typography variant="label-sm" className="mb-2">
          Conceptual
        </Typography>
        <HtmlText html={text} />
      </View>
    );
  }

  return <VerseBlock text={text} />;
}
