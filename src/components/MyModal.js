import { MaterialIcons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyModal2 from './MyModal2';

import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const MyModal = ({ setModalActive, data, idWillUpdate, todo, setTodos, storeTodoListToAsyncStorage }) => {
    const inputRef = useRef();
    const [isAlertAdded, setIsAlertAdded] = useState(data.alert ? true : false)
    const [text, setText] = useState(data.task)
    const [isAddAlertModalActive, setAlertModalActive] = useState(false)

    const updateTodo = () => {
        if (text.length > 5) {
            var newTodoDate = data
            newTodoDate.task = text
            newTodoDate.alert = isAlertAdded ? true : null
            storeTodoListToAsyncStorage(todo)
            setModalActive(false)
        }
        else {
            Alert.alert("Hata", "Lütfen en az 6 karakter yazın")
        }
    }

    const openAlertModal = () => {
        inputRef.current.blur();
        setAlertModalActive(true)
    }

    return (
        <View style={styles.modalContainer}>
            {isAddAlertModalActive && <MyModal2 storeTodoListToAsyncStorage={storeTodoListToAsyncStorage} setIsAlertAdded={setIsAlertAdded} data={data} todo={todo} setAlertModalActive={setAlertModalActive} />}
            <View style={styles.modal}>
                <TouchableOpacity onPress={() => setModalActive(false)} style={styles.modalCancelIcon}>
                    <MaterialIcons name="cancel" size={30} color="black" />
                </TouchableOpacity>
                <View style={styles.modalContentArea}>
                    <TextInput ref={inputRef} maxLength={40} autoFocus onChangeText={setText} value={text} style={styles.modalInput} placeholder='Please enter new value' />
                </View>
                <TouchableOpacity onPress={openAlertModal} style={styles.addAlertButton}>
                    <MaterialIcons name="add-alert" size={30} color={isAlertAdded ? "green" : "red"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={updateTodo} style={styles.updateButton}>
                    <Text style={{ color: "#fff" }}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MyModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        position: "absolute",
        width: "130%",
        height: "100%",
        zIndex: 1,
        padding: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        backgroundColor: "#fff",
        height: "30%",
        width: "80%",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderRadius: 20
    },
    modalCancelIcon: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end"
    },
    modalContentArea: {
        paddingHorizontal: 20,
        paddingTop: 20
    },
    modalInput: {
        borderWidth: 1,
        padding: 5,
        paddingLeft: 10
    },
    updateButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        padding: 10,
        margin: 5,
        backgroundColor: "black",
        borderRadius: 10
    },
    addAlertButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0
    }
})