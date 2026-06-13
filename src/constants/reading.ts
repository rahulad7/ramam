import type { FontSize } from '@/types/settings';

export const FONT_SIZE_STYLES: Record<
  FontSize,
  { fontSize: number; lineHeight: number; className: string }
> = {
  sm: { fontSize: 14, lineHeight: 24, className: 'text-sm leading-6' },
  md: { fontSize: 16, lineHeight: 28, className: 'text-base leading-7' },
  lg: { fontSize: 18, lineHeight: 32, className: 'text-lg leading-8' },
};
