import { View } from 'react-native';

type DividerProps = {
  className?: string;
};

export function Divider({ className = '' }: DividerProps) {
  return <View className={`h-px border-b border-dotted border-outline-variant my-4 ${className}`} />;
}
