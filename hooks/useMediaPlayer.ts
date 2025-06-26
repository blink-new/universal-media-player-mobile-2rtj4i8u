import { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlaylistItem } from '@/lib/types';

export function useMediaPlayer() {
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    loadPlaylist();
    setupAudio();

    return () => {
      cleanupSound();
    };
  }, []);

  const setupAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.warn('Error setting up audio:', error);
    }
  };

  const loadPlaylist = async () => {
    try {
      const stored = await AsyncStorage.getItem('mediaPlayerPlaylist');
      if (stored) {
        setPlaylist(JSON.parse(stored));
      }
    } catch (error) {
      console.warn('Error loading playlist:', error);
    }
  };

  const savePlaylist = async (newPlaylist: PlaylistItem[]) => {
    try {
      await AsyncStorage.setItem('mediaPlayerPlaylist', JSON.stringify(newPlaylist));
    } catch (error) {
      console.warn('Error saving playlist:', error);
    }
  };

  const cleanupSound = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.unloadAsync();
      } catch (error) {
        console.warn('Error unloading sound:', error);
      }
      soundRef.current = null;
    }
  };

  const loadTrack = async (track: PlaylistItem) => {
    setIsLoading(true);
    await cleanupSound();

    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: track.uri },
        { shouldPlay: false, volume },
        onPlaybackStatusUpdate
      );
      
      soundRef.current = sound;
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading track:', error);
      setIsLoading(false);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis || 0);
      setDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying || false);

      if (status.didJustFinish) {
        playNext();
      }
    }
  };

  const playTrack = async (index: number) => {
    if (index >= 0 && index < playlist.length) {
      setCurrentTrackIndex(index);
      await loadTrack(playlist[index]);
    }
  };

  const togglePlayback = async () => {
    if (!soundRef.current) return;

    try {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
      } else {
        await soundRef.current.playAsync();
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  const playNext = async () => {
    if (currentTrackIndex !== null && playlist.length > 0) {
      const nextIndex = (currentTrackIndex + 1) % playlist.length;
      await playTrack(nextIndex);
    }
  };

  const playPrevious = async () => {
    if (currentTrackIndex !== null && playlist.length > 0) {
      const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
      await playTrack(prevIndex);
    }
  };

  const seekTo = async (positionMillis: number) => {
    if (soundRef.current) {
      try {
        await soundRef.current.setPositionAsync(positionMillis);
      } catch (error) {
        console.error('Error seeking:', error);
      }
    }
  };

  const setVolumeLevel = async (newVolume: number) => {
    setVolume(newVolume);
    if (soundRef.current) {
      try {
        await soundRef.current.setVolumeAsync(newVolume);
      } catch (error) {
        console.error('Error setting volume:', error);
      }
    }
  };

  const addToPlaylist = (items: PlaylistItem[]) => {
    const newPlaylist = [...playlist, ...items];
    setPlaylist(newPlaylist);
    savePlaylist(newPlaylist);

    if (currentTrackIndex === null && items.length > 0) {
      setCurrentTrackIndex(playlist.length);
    }
  };

  const removeFromPlaylist = (id: string) => {
    const itemIndex = playlist.findIndex(item => item.id === id);
    if (itemIndex === -1) return;

    const newPlaylist = playlist.filter(item => item.id !== id);
    setPlaylist(newPlaylist);
    savePlaylist(newPlaylist);

    if (currentTrackIndex === itemIndex) {
      if (newPlaylist.length === 0) {
        setCurrentTrackIndex(null);
        cleanupSound();
      } else if (currentTrackIndex >= newPlaylist.length) {
        setCurrentTrackIndex(newPlaylist.length - 1);
      }
    } else if (currentTrackIndex !== null && itemIndex < currentTrackIndex) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  const currentTrack = currentTrackIndex !== null ? playlist[currentTrackIndex] : null;

  return {
    playlist,
    currentTrack,
    currentTrackIndex,
    isPlaying,
    position,
    duration,
    volume,
    isLoading,
    playTrack,
    togglePlayback,
    playNext,
    playPrevious,
    seekTo,
    setVolumeLevel,
    addToPlaylist,
    removeFromPlaylist,
  };
}