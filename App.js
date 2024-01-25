import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MyTodoInput from './src/components/MyTodoInput';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' backgroundColor='#fff' hidden={false} translucent={true} />
      <View style={styles.inputAndButtonContainer}>
        <MyTodoInput />
        <TouchableOpacity style={styles.addTaskButton}><Text style={{ color: '#fff' }}>Add</Text></TouchableOpacity>
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
  },
  addTaskButton: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black"
  }
});
