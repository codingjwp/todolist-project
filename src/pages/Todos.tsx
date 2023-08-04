import TodoCreate from "../components/TodoCreate";
import TodoList from "../components/TodoList";
import { useTodoEvent } from "../hooks/useTodoEvent";

const Todos = () => {
  const {todoData, setTodoData } = useTodoEvent()
  return (
    <>
      <TodoList todoData={todoData} setTodoData={setTodoData} />
      <TodoCreate setTodoData={setTodoData} />
    </>
  )
}
export default Todos;
