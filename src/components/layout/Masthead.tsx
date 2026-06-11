import { View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { APP_NAME } from '@/constants/kandas';

type MastheadProps = {
  subtitle?: string;
};

export function Masthead({ subtitle }: MastheadProps) {
  return (
    <View className="items-center py-6 border-b border-dotted border-outline-variant">
      <Typography variant="label-sm">The Archive</Typography>
      <Typography variant="headline" className="mt-2 tracking-[0.2em]">
        {APP_NAME}
      </Typography>
      {subtitle ? (
        <Typography variant="caption" className="mt-2 text-center px-4">
          {subtitle}
        </Typography>
      ) : null}
    </View>
  );
}
