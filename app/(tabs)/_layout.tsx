import { Tabs } from 'expo-router';

import { TabBar } from '@/components/layout/TabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="library" options={{ title: 'Library' }} />
      <Tabs.Screen name="search" options={{ title: 'Search' }} />
      <Tabs.Screen name="profile" options={{ title: 'Account' }} />
      <Tabs.Screen name="bookmarks" options={{ href: null, title: 'Bookmarks' }} />
      <Tabs.Screen name="daily-wisdom" options={{ href: null }} />
    </Tabs>
  );
}
