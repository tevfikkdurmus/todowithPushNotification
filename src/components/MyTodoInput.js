import { StyleSheet, Text, View, TextInput } from 'react-native'

const MyTodoInput = ({ task, setTask, inputRef }) => {
    return <TextInput ref={inputRef} value={task} onChangeText={text => setTask(text)} placeholderTextColor={'black'} cursorColor={'black'} style={styles.input} placeholder='Write something...' />
}

export default MyTodoInput

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 5,
        width: 250,
        height: 50,
        paddingLeft: 10,
        borderRadius: 15,
        color: "black"
    }
})