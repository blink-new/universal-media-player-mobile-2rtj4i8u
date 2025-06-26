import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SlidersHorizontal } from 'lucide-react-native';

export default function EffectsScreen() {
  // Placeholder EQ bands
  const bands = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000];

  return (
    <LinearGradient colors={["#101624", "#19213a"]} style={styles.container}>
      <View style={styles.header}>
        <SlidersHorizontal size={28} color="#06b6d4" />
        <Text style={styles.title}>Audio Effects</Text>
      </View>
      <ScrollView contentContainerStyle={styles.eqContainer} horizontal showsHorizontalScrollIndicator={false}>
        {bands.map((freq) => (
          <View key={freq} style={styles.band}>
            <View style={styles.sliderTrack} />
            <Text style={styles.bandLabel}>{freq}Hz</Text>
          </View>
        ))}
      </ScrollView>
      <Text style={styles.comingSoon}>EQ & effects coming soon!</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 12,
  },
  eqContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 20,
    marginBottom: 32,
  },
  band: {
    alignItems: 'center',
    width: 40,
  },
  sliderTrack: {
    width: 8,
    height: 120,
    borderRadius: 4,
    backgroundColor: 'rgba(6,182,212,0.18)',
    marginBottom: 8,
  },
  bandLabel: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  },
  comingSoon: {
    color: '#64748b',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
