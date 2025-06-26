import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Music, Play, Pause, SkipBack, SkipForward } from 'lucide-react-native';

export default function PlayerScreen() {
  // Placeholder state for demo
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <LinearGradient colors={["#101624", "#19213a"]} style={styles.container}>
      <View style={styles.artworkContainer}>
        <View style={styles.artwork}>
          <Music size={80} color="#06b6d4" />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>No Track Selected</Text>
        <Text style={styles.artist}>Add a track to get started</Text>
      </View>
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlBtn}>
          <SkipBack size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.playBtn}
          onPress={() => setIsPlaying((p) => !p)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#101624" />
          ) : isPlaying ? (
            <Pause size={36} color="#101624" />
          ) : (
            <Play size={36} color="#101624" />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn}>
          <SkipForward size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  artworkContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  artwork: {
    width: 220,
    height: 220,
    borderRadius: 24,
    backgroundColor: 'rgba(6,182,212,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(6,182,212,0.18)',
    shadowColor: '#06b6d4',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  artist: {
    fontSize: 16,
    color: '#94a3b8',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  controlBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#06b6d4',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    shadowColor: '#06b6d4',
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
});
