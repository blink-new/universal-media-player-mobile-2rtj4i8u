import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Music, ListMusic, SlidersHorizontal } from 'lucide-react-native';

export default function RootLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#101624',
            borderTopColor: '#222b44',
            borderTopWidth: 1,
          },
          tabBarActiveTintColor: '#06b6d4',
          tabBarInactiveTintColor: '#64748b',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Player',
            tabBarIcon: ({ color, size }) => <Music color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="playlist"
          options={{
            title: 'Playlist',
            tabBarIcon: ({ color, size }) => <ListMusic color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="effects"
          options={{
            title: 'Effects',
            tabBarIcon: ({ color, size }) => <SlidersHorizontal color={color} size={size} />,
          }}
        />
      </Tabs>
      <StatusBar style="light" />
    </>
  );
}
