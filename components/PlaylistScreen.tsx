import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Music } from 'lucide-react-native';

export default function PlaylistScreen() {
  // Placeholder playlist
  const playlist = [];

  return (
    <LinearGradient colors={["#101624", "#19213a"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Playlist</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Plus size={24} color="#101624" />
        </TouchableOpacity>
      </View>
      {playlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Music size={64} color="#64748b" />
          <Text style={styles.emptyText}>No tracks yet</Text>
          <Text style={styles.emptySubtext}>Tap + to add music or video files</Text>
        </View>
      ) : (
        <FlatList
          data={playlist}
          renderItem={({ item }) => (
            <View style={styles.trackItem}>
              <Text style={styles.trackName}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
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
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  addBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#06b6d4',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#06b6d4',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 8,
    textAlign: 'center',
  },
  trackItem: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
    marginBottom: 12,
  },
  trackName: {
    color: '#fff',
    fontSize: 16,
  },
});
