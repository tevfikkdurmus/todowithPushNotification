import { StyleSheet, Text, View } from 'react-native'

const TodoItem = ({ data }) => {
    return (
        <View style={styles.todoItem}>
            <Text>{data.task}</Text>
        </View>
    )
}

export default TodoItem

const styles = StyleSheet.create({
    todoItem: {
        justifyContent: "center",
        alignItems: "center",
        height: 50
    }
})