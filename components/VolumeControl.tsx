import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Slider } from '@react-native-community/slider';
import { Volume2, VolumeX } from 'lucide-react-native';

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export function VolumeControl({ volume, onVolumeChange }: VolumeControlProps) {
  return (
    <View style={styles.container}>
      <VolumeX size={20} color="#64748b" />
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={volume}
        onSlidingComplete={onVolumeChange}
        minimumTrackTintColor="#06b6d4"
        maximumTrackTintColor="rgba(148, 163, 184, 0.3)"
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
      />
      <Volume2 size={20} color="#64748b" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 12,
  },
  slider: {
    flex: 1,
    height: 30,
  },
  thumb: {
    backgroundColor: '#06b6d4',
    width: 12,
    height: 12,
  },
  track: {
    height: 2,
    borderRadius: 1,
  },
});