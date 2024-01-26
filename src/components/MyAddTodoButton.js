import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const MyAddTodoButton = ({ handleClickAddTaskButton }) => {
    return <TouchableOpacity onPress={handleClickAddTaskButton} style={styles.addTaskButton}><Text style={{ color: '#fff' }}>Add</Text></TouchableOpacity>
}

export default MyAddTodoButton

const styles = StyleSheet.create({
    addTaskButton: {
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black"
    }
});