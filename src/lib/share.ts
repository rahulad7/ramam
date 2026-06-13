import { Share } from 'react-native';

import { APP_NAME } from '@/constants/kandas';

export async function shareText(title: string, message: string) {
  try {
    await Share.share({
      title,
      message: `${message}\n\n— ${APP_NAME}`,
    });
  } catch {
    // User dismissed share sheet
  }
}
