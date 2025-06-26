import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Slider } from '@react-native-community/slider';

interface PlaybackControlsProps {
  position: number;
  duration: number;
  onSeek: (position: number) => void;
}

export function PlaybackControls({ position, duration, onSeek }: PlaybackControlsProps) {
  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? position / duration : 0;

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={onSeek}
          minimumTrackTintColor="#06b6d4"
          maximumTrackTintColor="rgba(148, 163, 184, 0.3)"
          thumbStyle={styles.thumb}
          trackStyle={styles.track}
        />
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sliderContainer: {
    paddingHorizontal: 8,
  },
  slider: {
    height: 40,
  },
  thumb: {
    backgroundColor: '#06b6d4',
    width: 16,
    height: 16,
  },
  track: {
    height: 3,
    borderRadius: 1.5,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  timeText: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
});