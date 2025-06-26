import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Music,
} from 'lucide-react-native';
import Animated, { 
  FadeInDown, 
  useSharedValue, 
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useMediaPlayer } from '@/hooks/useMediaPlayer';
import { PlaybackControls } from './PlaybackControls';
import { VolumeControl } from './VolumeControl';

export function MediaPlayer() {
  const {
    currentTrack,
    isPlaying,
    position,
    duration,
    volume,
    isLoading,
    togglePlayback,
    playNext,
    playPrevious,
    seekTo,
    setVolumeLevel,
  } = useMediaPlayer();

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePlayPress = () => {
    scale.value = withSpring(0.95, { duration: 100 }, () => {
      scale.value = withSpring(1);
    });
    togglePlayback();
  };

  if (!currentTrack) {
    return (
      <View style={styles.emptyContainer}>
        <Music size={80} color="#64748b" />
        <Text style={styles.emptyText}>No track selected</Text>
        <Text style={styles.emptySubtext}>
          Add media files to your playlist to get started
        </Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#0f172a', '#1e293b', '#334155']}
      style={styles.container}
    >
      <Animated.View 
        style={[styles.content, animatedStyle]}
        entering={FadeInDown.duration(600)}
      >
        {/* Album Art */}
        <View style={styles.albumArtContainer}>
          <BlurView intensity={20} style={styles.albumArtBlur}>
            <View style={styles.albumArt}>
              <Music size={60} color="#06b6d4" />
            </View>
          </BlurView>
        </View>

        {/* Track Info */}
        <View style={styles.trackInfo}>
          <Text style={styles.trackTitle} numberOfLines={2}>
            {currentTrack.name}
          </Text>
          <Text style={styles.trackArtist} numberOfLines={1}>
            {currentTrack.type.toUpperCase()} • {Math.floor((currentTrack.duration || 0) / 60000)}:{String(Math.floor(((currentTrack.duration || 0) % 60000) / 1000)).padStart(2, '0')}
          </Text>
        </View>

        {/* Playback Controls */}
        <PlaybackControls
          position={position}
          duration={duration}
          onSeek={seekTo}
        />

        {/* Media Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={playPrevious}
          >
            <SkipBack size={28} color="#f1f5f9" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.playButton, isLoading && styles.playButtonDisabled]}
            onPress={handlePlayPress}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#0f172a" />
            ) : isPlaying ? (
              <Pause size={32} color="#0f172a" />
            ) : (
              <Play size={32} color="#0f172a" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={playNext}
          >
            <SkipForward size={28} color="#f1f5f9" />
          </TouchableOpacity>
        </View>

        {/* Volume Control */}
        <VolumeControl
          volume={volume}
          onVolumeChange={setVolumeLevel}
        />
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#f1f5f9',
    marginTop: 20,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 22,
  },
  albumArtContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  albumArtBlur: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  albumArt: {
    width: 200,
    height: 200,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  trackInfo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  trackTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#f1f5f9',
    textAlign: 'center',
    marginBottom: 8,
  },
  trackArtist: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    gap: 30,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(241, 245, 249, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(241, 245, 249, 0.2)',
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#06b6d4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  playButtonDisabled: {
    backgroundColor: '#64748b',
    shadowOpacity: 0.1,
  },
});