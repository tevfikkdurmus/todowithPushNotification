import { FlatList } from 'react-native'
import TodoItem from './TodoItem'

const MyTodoList = ({ data }) => {
    return <FlatList
        data={data}
        renderItem={({ item }) => <TodoItem data={item} />}
        keyExtractor={item => item.id}
    />
}

export default MyTodoList