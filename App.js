import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, Alert, Text, FlatList, ScrollView } from 'react-native';
import MyTodoInput from './src/components/MyTodoInput';
import MyAddTodoButton from './src/components/MyAddTodoButton';
import { useEffect, useRef, useState } from 'react';
import MyTodoList from './src/components/MyTodoList';
import MyModal from './src/components/MyModal';

export default function App() {
  const inputRef = useRef();

  const [todo, setTodos] = useState([{ id: 0, task: "asd", alert: null }])
  const [task, setTask] = useState("")
  const [isModalActive, setModalActive] = useState(false)
  const [idWillUpdate, setIdWillUpdate] = useState(-1)

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

  const deleteTodoItem = (id) => {
    const newTodoData = todo.filter(object => object.id != id)
    setTodos(newTodoData)
  }

  const updateProperties = (id) => {
    setIdWillUpdate(id)
    setModalActive(true)
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
      {isModalActive && <MyModal todo={todo} setTodos={setTodos} data={todo.find(object => object.id == idWillUpdate)} idWillUpdate={idWillUpdate} setModalActive={setModalActive} />}
      <StatusBar style='dark' backgroundColor='#fff' hidden={false} translucent={true} />
      <View style={styles.inputAndButtonContainer}>
        <MyTodoInput inputRef={inputRef} task={task} setTask={setTask} />
        <MyAddTodoButton handleClickAddTaskButton={handleClickAddTaskButton} />
      </View>
      <View style={[styles.todoListContainer, { borderWidth: todo.length > 0 ? 1 : 0 }]}>
        {todo.length > 0 && <Text style={styles.todoListTitle}>Todo List</Text>}
        <MyTodoList updateProperties={updateProperties} deleteTodoItem={deleteTodoItem} data={todo} />
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
    paddingHorizontal: '10%',
    gap: 30
  },
  inputAndButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: '100%'
  },
  todoListContainer: {
    width: "100%",
    maxHeight: "60%",
    borderRadius: 20,
    paddingLeft: 10
  },
  todoListTitle: {
    alignSelf: "center",
    fontSize: 20
  }
});