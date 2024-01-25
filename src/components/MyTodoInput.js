import { StyleSheet, Text, View, TextInput } from 'react-native'

const MyTodoInput = () => {
    return <TextInput style={styles.input} placeholder='Write something...' />
}

export default MyTodoInput

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 5
    }
})