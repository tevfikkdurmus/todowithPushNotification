import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, Alert, Text, FlatList, ScrollView, Platform } from 'react-native';
import MyTodoInput from './src/components/MyTodoInput';
import MyAddTodoButton from './src/components/MyAddTodoButton';
import { useEffect, useRef, useState } from 'react';
import MyTodoList from './src/components/MyTodoList';
import MyModal from './src/components/MyModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

export default function App() {
  const inputRef = useRef();


  const [todo, setTodos] = useState([])
  const [task, setTask] = useState("")
  const [isModalActive, setModalActive] = useState(false)
  const [idWillUpdate, setIdWillUpdate] = useState(-1)

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => console.log(token)).catch(err => console.log(err));
    getTodoListFromAsyncStorage();
  }, [])

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  async function scheduleNotification(timestamp, data) {
    console.log("data bu olcak ", data);
    var date = new Date(timestamp * 1000);
    console.log("App.js ", date.getMinutes());
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Günlük Hatırlatma",
        body: data.task,
      },
      trigger: {
        hour: date.getHours(),
        minute: date.getMinutes(),
        repeats: true, // Günlük olarak tekrar et,
      },
    }).then(res => console.log("alarm oluştu")).catch(err => console.log("error var"));
  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS == 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig.extra.eas.projectId })).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token;
  }

  const storeTodoListToAsyncStorage = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('todo-list', jsonValue);
    } catch (e) {
    }
  };

  const getTodoListFromAsyncStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('todo-list');
      console.log(JSON.parse(jsonValue));
      setTodos(jsonValue == null ? [] : JSON.parse(jsonValue))
    } catch (e) {
    }
  };

  const calculateNewTodoId = () => {
    if (todo?.length == 0) {
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
    storeTodoListToAsyncStorage(newTodoData)
  }

  const updateProperties = (id) => {
    setIdWillUpdate(id)
    setModalActive(true)
  }

  const addNewTodoItem = (data) => {
    setTodos([...todo, { id: calculateNewTodoId(), task: data.task, alert: data.alert }])
    storeTodoListToAsyncStorage([...todo, { id: calculateNewTodoId(), task: data.task, alert: data.alert }])
  }

  const handleClickAddTaskButton = () => {
    if (task?.length > 5) {
      inputRef.current.blur()
      setTask("")
      console.log(todo);
      addNewTodoItem({ task, alert: null })
    }
    else {
      Alert.alert("Hata", "Lütfen en az 6 karakter yazın.")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {isModalActive && <MyModal setModalActive={setModalActive} scheduleNotification={scheduleNotification} storeTodoListToAsyncStorage={storeTodoListToAsyncStorage} todo={todo} setTodos={setTodos} data={todo.find(object => object.id == idWillUpdate)} idWillUpdate={idWillUpdate} setModalActive={setModalActive} />}
      <StatusBar style='dark' backgroundColor='#fff' hidden={false} translucent={true} />
      <View style={styles.inputAndButtonContainer}>
        <MyTodoInput inputRef={inputRef} task={task} setTask={setTask} />
        <MyAddTodoButton handleClickAddTaskButton={handleClickAddTaskButton} />
      </View>
      <View style={[styles.todoListContainer, { borderWidth: todo?.length > 0 ? 1 : 0 }]}>
        {todo?.length > 0 && <Text style={styles.todoListTitle}>Todo List</Text>}
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