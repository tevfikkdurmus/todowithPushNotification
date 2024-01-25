import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MyTodoInput from './src/components/MyTodoInput';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' backgroundColor='#fff' hidden={false} translucent={true} />
      <MyTodoInput />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
