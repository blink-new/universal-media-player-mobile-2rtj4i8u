import { View, StyleSheet } from 'react-native';
import PlayerScreen from '../components/PlayerScreen';

export default function Home() {
  return (
    <View style={styles.container}>
      <PlayerScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101624',
  },
});
