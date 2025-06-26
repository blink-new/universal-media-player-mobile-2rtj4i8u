import { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { MediaPlayerProvider } from '@/contexts/MediaPlayerContext';
import { Music, Library, Settings } from 'lucide-react-native';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <MediaPlayerProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1e293b',
            borderTopColor: '#475569',
            borderTopWidth: 1,
          },
          tabBarActiveTintColor: '#06b6d4',
          tabBarInactiveTintColor: '#94a3b8',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Player',
            tabBarIcon: ({ color, size }) => (
              <Music size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="playlist"
          options={{
            title: 'Playlist',
            tabBarIcon: ({ color, size }) => (
              <Library size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="effects"
          options={{
            title: 'Effects',
            tabBarIcon: ({ color, size }) => (
              <Settings size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="light" />
    </MediaPlayerProvider>
  );
}