import Card, {CardVariant} from "./components/Card";
import {ITodo, IUser} from "./types/types";
import {useEffect, useState} from "react";
import axios from "axios";
import List from "./components/List";
import UserItem from "./components/UserItem";
import TodoItem from "./components/TodoItem";
import EventsExample from "./components/EventsExample";

const App = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    fetchUsers();
    fetchTodos();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
      setUsers(response.data)
    } catch (e) {
    }
  }
const fetchTodos = async () => {
    try {
      const response = await axios.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos?_limit=10')
      setTodos(response.data)
    } catch (e) {
    }
  }

  return (
    <div>
      <EventsExample/>
      <Card variant={CardVariant.primary} height="200px" width="200px">
        <button>Push</button>
      </Card>
      <List items={users} renderItem={(user: IUser) => <UserItem user={user} key={user.id}/>}/>
      <List items={todos} renderItem={(todo: ITodo ) => <TodoItem todo={todo} key={todo.id}/>}/>
    </div>
  )
}

export default App;