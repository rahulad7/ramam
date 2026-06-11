import { Pressable, Text, type PressableProps } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = PressableProps & {
  label: string;
  variant?: ButtonVariant;
  className?: string;
};

const variantClasses: Record<ButtonVariant, { container: string; text: string }> = {
  primary: {
    container: 'bg-primary px-6 py-4 rounded-interactive',
    text: 'text-on-primary font-work-medium text-sm uppercase tracking-widest',
  },
  secondary: {
    container: 'border border-primary px-6 py-4 rounded-interactive bg-background',
    text: 'text-primary font-work-medium text-sm uppercase tracking-widest',
  },
  ghost: {
    container: 'px-4 py-2',
    text: 'text-on-surface-variant font-work text-sm uppercase tracking-wider',
  },
};

export function Button({ label, variant = 'primary', className = '', disabled, ...props }: ButtonProps) {
  const styles = variantClasses[variant];

  return (
    <Pressable
      className={`${styles.container} ${disabled ? 'opacity-50' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      <Text className={`${styles.text} text-center`}>{label}</Text>
    </Pressable>
  );
}
