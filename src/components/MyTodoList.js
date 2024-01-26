import { FlatList } from 'react-native'
import TodoItem from './TodoItem'

const MyTodoList = ({ data, deleteTodoItem }) => {
    return <FlatList
        data={data}
        renderItem={({ item }) => <TodoItem deleteTodoItem={deleteTodoItem} data={item} />}
        keyExtractor={item => item.id}
    />
}

export default MyTodoList