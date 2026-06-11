import { Stack } from 'expo-router';

export default function LibraryLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#fdf8f7' },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[kanda]/index" />
      <Stack.Screen name="[kanda]/[sarga]" />
    </Stack>
  );
}
