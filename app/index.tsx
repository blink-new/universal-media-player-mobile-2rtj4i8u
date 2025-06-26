import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MediaPlayer } from '@/components/MediaPlayer';

export default function PlayerScreen() {
  return (
    <View style={styles.container}>
      <MediaPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});