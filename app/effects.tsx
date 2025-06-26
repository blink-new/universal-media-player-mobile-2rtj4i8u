import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Slider } from '@react-native-community/slider';
import {
  Settings2,
  Equalizer,
  Volume2,
  Sliders,
} from 'lucide-react-native';
import { useMediaPlayer } from '@/hooks/useMediaPlayer';
import { eqBandsDefinition, eqPresets } from '@/lib/media-defaults';

export default function EffectsScreen() {
  const { currentTrack } = useMediaPlayer();
  const [eqValues, setEqValues] = useState<number[]>(
    Array(eqBandsDefinition.length).fill(0)
  );
  const [selectedPreset, setSelectedPreset] = useState<string>('flat');

  const handleEqChange = (index: number, value: number) => {
    const newValues = [...eqValues];
    newValues[index] = value;
    setEqValues(newValues);
    setSelectedPreset('custom');
  };

  const applyPreset = (presetName: string) => {
    const preset = eqPresets[presetName as keyof typeof eqPresets];
    if (preset) {
      setEqValues(preset);
      setSelectedPreset(presetName);
    }
  };

  const isDisabled = !currentTrack;

  return (
    <LinearGradient
      colors={['#0f172a', '#1e293b']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Effects</Text>
            <Text style={styles.headerSubtitle}>
              {isDisabled 
                ? 'Select a track to adjust audio effects'
                : 'Fine-tune your audio experience'
              }
            </Text>
          </View>

          {/* Equalizer Section */}
          <View style={[styles.section, isDisabled && styles.disabledSection]}>
            <View style={styles.sectionHeader}>
              <Equalizer size={24} color="#06b6d4" />
              <Text style={styles.sectionTitle}>Equalizer</Text>
            </View>

            {/* Presets */}
            <View style={styles.presetsContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {Object.keys(eqPresets).map((preset) => (
                  <TouchableOpacity
                    key={preset}
                    style={[
                      styles.presetButton,
                      selectedPreset === preset && styles.activePresetButton,
                      isDisabled && styles.disabledButton,
                    ]}
                    onPress={() => applyPreset(preset)}
                    disabled={isDisabled}
                  >
                    <Text
                      style={[
                        styles.presetButtonText,
                        selectedPreset === preset && styles.activePresetButtonText,
                      ]}
                    >
                      {preset.charAt(0).toUpperCase() + preset.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* EQ Sliders */}
            <View style={styles.eqContainer}>
              {eqBandsDefinition.map((band, index) => (
                <View key={band.name} style={styles.eqBand}>
                  <Text style={styles.eqBandLabel}>{band.name}</Text>
                  <View style={styles.eqSliderContainer}>
                    <Text style={styles.eqValue}>+12</Text>
                    <Slider
                      style={styles.eqSlider}
                      minimumValue={-12}
                      maximumValue={12}
                      value={eqValues[index]}
                      onSlidingComplete={(value) => handleEqChange(index, value)}
                      minimumTrackTintColor="#06b6d4"
                      maximumTrackTintColor="rgba(148, 163, 184, 0.3)"
                      thumbStyle={[
                        styles.eqThumb,
                        isDisabled && styles.disabledThumb,
                      ]}
                      trackStyle={styles.eqTrack}
                      vertical
                      disabled={isDisabled}
                    />
                    <Text style={styles.eqValue}>-12</Text>
                  </View>
                  <Text style={styles.eqCurrentValue}>
                    {eqValues[index].toFixed(1)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Audio Effects Section */}
          <View style={[styles.section, isDisabled && styles.disabledSection]}>
            <View style={styles.sectionHeader}>
              <Sliders size={24} color="#06b6d4" />
              <Text style={styles.sectionTitle}>Audio Effects</Text>
            </View>

            <View style={styles.effectsGrid}>
              <View style={styles.effectItem}>
                <Text style={styles.effectLabel}>Bass Boost</Text>
                <Slider
                  style={styles.effectSlider}
                  minimumValue={0}
                  maximumValue={100}
                  value={0}
                  minimumTrackTintColor="#06b6d4"
                  maximumTrackTintColor="rgba(148, 163, 184, 0.3)"
                  thumbStyle={[styles.effectThumb, isDisabled && styles.disabledThumb]}
                  trackStyle={styles.effectTrack}
                  disabled={isDisabled}
                />
                <Text style={styles.effectValue}>0%</Text>
              </View>

              <View style={styles.effectItem}>
                <Text style={styles.effectLabel}>Reverb</Text>
                <Slider
                  style={styles.effectSlider}
                  minimumValue={0}
                  maximumValue={100}
                  value={0}
                  minimumTrackTintColor="#06b6d4"
                  maximumTrackTintColor="rgba(148, 163, 184, 0.3)"
                  thumbStyle={[styles.effectThumb, isDisabled && styles.disabledThumb]}
                  trackStyle={styles.effectTrack}
                  disabled={isDisabled}
                />
                <Text style={styles.effectValue}>0%</Text>
              </View>

              <View style={styles.effectItem}>
                <Text style={styles.effectLabel}>Echo</Text>
                <Slider
                  style={styles.effectSlider}
                  minimumValue={0}
                  maximumValue={100}
                  value={0}
                  minimumTrackTintColor="#06b6d4"
                  maximumTrackTintColor="rgba(148, 163, 184, 0.3)"
                  thumbStyle={[styles.effectThumb, isDisabled && styles.disabledThumb]}
                  trackStyle={styles.effectTrack}
                  disabled={isDisabled}
                />
                <Text style={styles.effectValue}>0%</Text>
              </View>

              <View style={styles.effectItem}>
                <Text style={styles.effectLabel}>Clarity</Text>
                <Slider
                  style={styles.effectSlider}
                  minimumValue={0}
                  maximumValue={100}
                  value={0}
                  minimumTrackTintColor="#06b6d4"
                  maximumTrackTintColor="rgba(148, 163, 184, 0.3)"
                  thumbStyle={[styles.effectThumb, isDisabled && styles.disabledThumb]}
                  trackStyle={styles.effectTrack}
                  disabled={isDisabled}
                />
                <Text style={styles.effectValue}>0%</Text>
              </View>
            </View>
          </View>

          {!isDisabled && (
            <View style={styles.resetContainer}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => {
                  setEqValues(Array(eqBandsDefinition.length).fill(0));
                  setSelectedPreset('flat');
                }}
              >
                <Text style={styles.resetButtonText}>Reset All Effects</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  disabledSection: {
    opacity: 0.5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#f1f5f9',
    marginLeft: 12,
  },
  presetsContainer: {
    marginBottom: 24,
  },
  presetButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.3)',
  },
  activePresetButton: {
    backgroundColor: '#06b6d4',
    borderColor: '#06b6d4',
  },
  disabledButton: {
    opacity: 0.3,
  },
  presetButtonText: {
    color: '#94a3b8',
    fontWeight: '500',
  },
  activePresetButtonText: {
    color: '#0f172a',
    fontWeight: '600',
  },
  eqContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 200,
    alignItems: 'flex-end',
  },
  eqBand: {
    alignItems: 'center',
    flex: 1,
  },
  eqBandLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8,
    transform: [{ rotate: '-45deg' }],
  },
  eqSliderContainer: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eqSlider: {
    width: 120,
    height: 20,
  },
  eqValue: {
    fontSize: 10,
    color: '#64748b',
  },
  eqCurrentValue: {
    fontSize: 12,
    color: '#06b6d4',
    fontWeight: '600',
    marginTop: 8,
  },
  eqThumb: {
    backgroundColor: '#06b6d4',
    width: 16,
    height: 16,
  },
  disabledThumb: {
    backgroundColor: '#64748b',
  },
  eqTrack: {
    height: 3,
    borderRadius: 1.5,
  },
  effectsGrid: {
    gap: 20,
  },
  effectItem: {
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.3)',
  },
  effectLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 12,
  },
  effectSlider: {
    height: 30,
    marginBottom: 8,
  },
  effectThumb: {
    backgroundColor: '#06b6d4',
    width: 20,
    height: 20,
  },
  effectTrack: {
    height: 4,
    borderRadius: 2,
  },
  effectValue: {
    fontSize: 14,
    color: '#06b6d4',
    fontWeight: '500',
    textAlign: 'center',
  },
  resetContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  resetButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
  },
});