import { FlatList } from 'react-native'
import TodoItem from './TodoItem'

const MyTodoList = ({ data, deleteTodoItem, updateTodoItem }) => {
    return <FlatList
        data={data}
        renderItem={({ item }) => <TodoItem updateTodoItem={updateTodoItem} deleteTodoItem={deleteTodoItem} data={item} />}
        keyExtractor={item => item.id}
    />
}

export default MyTodoList