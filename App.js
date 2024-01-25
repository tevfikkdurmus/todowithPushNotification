import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import MyTodoInput from './src/components/MyTodoInput';
import MyAddTodoButton from './src/components/MyAddTodoButton';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' backgroundColor='#fff' hidden={false} translucent={true} />
      <View style={styles.inputAndButtonContainer}>
        <MyTodoInput />
        <MyAddTodoButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '10%'
  },
  inputAndButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: '100%'
  }
});