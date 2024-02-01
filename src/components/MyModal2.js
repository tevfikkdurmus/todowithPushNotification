import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import moment from 'moment'
import Checkbox from 'expo-checkbox';

const MyModal2 = ({ storeTodoListToAsyncStorage, setIsAlertAdded, setAlertModalActive, data, todo }) => {
    //var m = moment(new Date(2011, 2, 12, 5, 0, 0));
    //console.log(m.hours());
    console.log(data);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(data.alert == null);
    const [isChecked, setChecked] = useState(data?.alert?.daily || false);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const getTime = () => {

        if (data?.alert?.time) {
            return moment(data.alert.time).format('LT');
        }

        var _date = moment(date).format('LT');
        return _date
    }

    const addAlert = () => {

        if (!data.alert) {
            setIsAlertAdded(true)
            setAlertModalActive(false)
            var newTodoDate = data
            newTodoDate.alert = {
                daily: isChecked,
                time: date.getTime()
            }
            storeTodoListToAsyncStorage(todo)
        }
        else {
            setIsAlertAdded(false)
            setAlertModalActive(false)
            var newTodoDate = data
            newTodoDate.alert = null
            storeTodoListToAsyncStorage(todo)
        }
    }

    return (
        <View style={styles.mainContainer}>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChangeDate}
                />
            )}
            <View style={styles.modalContainer}>
                <Text style={styles.title}>Add Alert</Text>
                <View style={styles.contentContainer}>
                    <TouchableOpacity onPress={() => setShow(true)}>
                        <Text style={{ alignSelf: "center" }}>Time : {getTime()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setChecked(!isChecked)} style={{ flexDirection: "row", gap: 5, alignSelf: "center", paddingHorizontal: 20, paddingVertical: 5 }}>
                        <Checkbox style={styles.checkbox} value={isChecked} />
                        <Text>daily</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 10 }}>
                    <TouchableOpacity onPress={addAlert} style={styles.addAlertButton}>
                        <Text style={{ color: "white" }}>{data.alert ? "Delete Alert" : "Add Alert"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setAlertModalActive(false)} style={styles.cancelButton}>
                        <Text style={{ color: "white" }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default MyModal2

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#d8d9e3",
        position: "absolute",
        zIndex: 2,
        width: "130%",
        height: "130%",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%"
    },
    title: {
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "600"
    },
    contentContainer: {
        marginVertical: 30,
        gap: 10
    },
    cancelButton: {
        backgroundColor: "black",
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    addAlertButton: {
        backgroundColor: "black",
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    checkbox: {
        width: 20,
        height: 20
    }
})