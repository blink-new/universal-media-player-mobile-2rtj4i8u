import { View, StyleSheet } from 'react-native';
import EffectsScreen from '../components/EffectsScreen';

export default function Effects() {
  return (
    <View style={styles.container}>
      <EffectsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101624',
  },
});
