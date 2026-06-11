import { Text, type TextProps } from 'react-native';

type TypographyVariant =
  | 'display'
  | 'headline'
  | 'headline-sm'
  | 'body-lg'
  | 'body'
  | 'label'
  | 'label-sm'
  | 'caption';

type TypographyProps = TextProps & {
  variant?: TypographyVariant;
  italic?: boolean;
};

const variantClasses: Record<TypographyVariant, string> = {
  display: 'font-garamond text-4xl text-on-surface',
  headline: 'font-garamond text-3xl text-on-surface',
  'headline-sm': 'font-garamond text-2xl text-on-surface',
  'body-lg': 'font-franklin text-lg leading-7 text-on-surface',
  body: 'font-franklin text-base leading-6 text-on-surface',
  label: 'font-work-medium text-sm text-on-surface-variant uppercase tracking-widest',
  'label-sm': 'font-work text-xs text-on-surface-variant uppercase tracking-wider',
  caption: 'font-franklin text-sm text-on-surface-variant',
};

export function Typography({ variant = 'body', italic = false, className = '', ...props }: TypographyProps) {
  const italicClass = italic ? 'italic' : '';

  return <Text className={`${variantClasses[variant]} ${italicClass} ${className}`} {...props} />;
}
