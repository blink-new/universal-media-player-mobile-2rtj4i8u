import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import {
  Plus,
  Music,
  Play,
  Trash2,
  Library,
} from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useMediaPlayerContext } from '@/contexts/MediaPlayerContext';
import { PlaylistItem } from '@/lib/types';

export default function PlaylistScreen() {
  const {
    playlist,
    currentTrack,
    playTrack,
    addToPlaylist,
    removeFromPlaylist,
  } = useMediaPlayerContext();

  const handleAddMedia = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['audio/*', 'video/*'],
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets) {
        const newItems: PlaylistItem[] = result.assets.map((asset, index) => ({
          id: `${Date.now()}-${index}`,
          name: asset.name,
          uri: asset.uri,
          type: asset.mimeType?.startsWith('video/') ? 'video' : 'audio',
          duration: 0,
          mimeType: asset.mimeType,
          size: asset.size,
        }));

        addToPlaylist(newItems);
      }
    } catch (error) {
      console.error('Error picking documents:', error);
      Alert.alert('Error', 'Failed to add media files');
    }
  };

  const handleRemoveItem = (id: string, name: string) => {
    Alert.alert(
      'Remove Track',
      `Remove "${name}" from playlist?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeFromPlaylist(id),
        },
      ]
    );
  };

  const renderPlaylistItem = ({ item, index }: { item: PlaylistItem; index: number }) => {
    const isCurrentTrack = currentTrack?.id === item.id;

    return (
      <Animated.View
        entering={FadeInRight.delay(index * 100)}
        style={[
          styles.playlistItem,
          isCurrentTrack && styles.currentTrackItem,
        ]}
      >
        <TouchableOpacity
          style={styles.playlistItemContent}
          onPress={() => playTrack(index)}
        >
          <View style={[
            styles.iconContainer,
            isCurrentTrack && styles.currentTrackIcon,
          ]}>
            {isCurrentTrack ? (
              <Play size={16} color="#0f172a" />
            ) : (
              <Music size={16} color="#64748b" />
            )}
          </View>

          <View style={styles.trackDetails}>
            <Text
              style={[
                styles.trackName,
                isCurrentTrack && styles.currentTrackText,
              ]}
              numberOfLines={1}
            >
              {item.name}
            </Text>
            <Text style={styles.trackInfo}>
              {item.type.toUpperCase()} • {item.size ? `${Math.round(item.size / 1024 / 1024 * 10) / 10}MB` : 'Unknown size'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveItem(item.id, item.name)}
          >
            <Trash2 size={18} color="#ef4444" />
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const EmptyPlaylist = () => (
    <View style={styles.emptyContainer}>
      <Library size={60} color="#64748b" />
      <Text style={styles.emptyTitle}>Your playlist is empty</Text>
      <Text style={styles.emptySubtitle}>
        Tap the + button to add your favorite music and videos
      </Text>
    </View>
  );

  return (
    <LinearGradient
      colors={['#0f172a', '#1e293b']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Playlist</Text>
          <Text style={styles.headerSubtitle}>
            {playlist.length} {playlist.length === 1 ? 'track' : 'tracks'}
          </Text>
        </View>

        <FlatList
          data={playlist}
          renderItem={renderPlaylistItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={[
            styles.listContent,
            playlist.length === 0 && styles.emptyListContent,
          ]}
          ListEmptyComponent={EmptyPlaylist}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddMedia}
        >
          <Plus size={24} color="#0f172a" />
        </TouchableOpacity>
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
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
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#f1f5f9',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
  },
  playlistItem: {
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.3)',
  },
  currentTrackItem: {
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  playlistItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(100, 116, 139, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  currentTrackIcon: {
    backgroundColor: '#06b6d4',
  },
  trackDetails: {
    flex: 1,
    marginRight: 12,
  },
  trackName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  currentTrackText: {
    color: '#06b6d4',
  },
  trackInfo: {
    fontSize: 14,
    color: '#64748b',
  },
  removeButton: {
    padding: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#06b6d4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});