import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, Alert } from 'react-native';
import MyTodoInput from './src/components/MyTodoInput';
import MyAddTodoButton from './src/components/MyAddTodoButton';
import { useEffect, useRef, useState } from 'react';

export default function App() {
  const inputRef = useRef();

  const [todo, setTodos] = useState([])
  const [task, setTask] = useState("")

  const calculateNewTodoId = () => {
    if (todo.length == 0) {
      return 0
    }
    const ids = todo.map(object => {
      return object.id;
    });
    const newId = (Math.max(...ids) + 1);
    return newId
  }

  const addNewTodoItem = (data) => {
    setTodos([...todo, { id: calculateNewTodoId(), task: data.task, alert: data.alert }])
  }

  const handleClickAddTaskButton = () => {
    if (task.length > 5) {
      inputRef.current.blur()
      setTask("")
      addNewTodoItem({ task, alert: null })
    }
    else {
      Alert.alert("Hata", "Lütfen en az 6 karakter yazın.")
    }
  }

  useEffect(() => {
    console.log(todo);
  }, [todo])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' backgroundColor='#fff' hidden={false} translucent={true} />
      <View style={styles.inputAndButtonContainer}>
        <MyTodoInput inputRef={inputRef} task={task} setTask={setTask} />
        <MyAddTodoButton handleClickAddTaskButton={handleClickAddTaskButton} />
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