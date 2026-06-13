import { View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { APP_NAME } from '@/constants/kandas';
import { formatDispatchDate, getIssueNumber } from '@/lib/dailyWisdom';

export function DispatchMasthead() {
  const issue = getIssueNumber();
  const dateLabel = formatDispatchDate();

  return (
    <View className="border-b border-outline-variant pb-4">
      <Typography variant="label" className="text-center tracking-[0.35em]">
        {APP_NAME.toUpperCase()}
      </Typography>
      <Typography variant="caption" className="mt-2 text-center">
        {dateLabel}
      </Typography>
      <Typography variant="label-sm" className="mt-1 text-center normal-case tracking-normal">
        Issue No. {issue}
      </Typography>
    </View>
  );
}
