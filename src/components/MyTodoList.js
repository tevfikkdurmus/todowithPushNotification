import { FlatList } from 'react-native'
import TodoItem from './TodoItem'

const MyTodoList = ({ data, deleteTodoItem, updateProperties }) => {
    return <FlatList
        data={data}
        renderItem={({ item }) => <TodoItem updateProperties={updateProperties} deleteTodoItem={deleteTodoItem} data={item} />}
        keyExtractor={item => item.id}
    />
}

export default MyTodoList