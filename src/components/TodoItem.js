import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const TodoItem = ({ data, deleteTodoItem }) => {
    return (
        <View style={styles.todoItem}>
            <Text>{data.task}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={()=>deleteTodoItem(data.id)}>
                    <MaterialIcons name="delete" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TodoItem

const styles = StyleSheet.create({
    todoItem: {
        justifyContent: "space-between",
        alignItems: "center",
        height: 50,
        flexDirection: "row",
    },
    buttonsContainer: {
        flexDirection: "row"
    }
})