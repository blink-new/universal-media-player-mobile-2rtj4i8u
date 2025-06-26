import { View, StyleSheet } from 'react-native';
import PlaylistScreen from '../components/PlaylistScreen';

export default function Playlist() {
  return (
    <View style={styles.container}>
      <PlaylistScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101624',
  },
});
