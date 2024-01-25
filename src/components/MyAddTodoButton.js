import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const MyAddTodoButton = () => {
    return <TouchableOpacity style={styles.addTaskButton}><Text style={{ color: '#fff' }}>Add</Text></TouchableOpacity>
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