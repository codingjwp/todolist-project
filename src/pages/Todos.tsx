import TodoCreate from "../components/TodoCreate";
import TodoList from "../components/TodoList";
import { IconButton } from "../components/Button";
import { useTodoEvent } from "../hooks/useTodoEvent";

const Todos = () => {
  const {todoData, length, setTodoData, setPages } = useTodoEvent();
  return (
    <>
      <TodoList todoData={todoData} setTodoData={setTodoData} />
      <TodoCreate setTodoData={setTodoData} />
      <IconButton type="button" $size='mini' $btnType='sub' $isIconOfText='no'
        $open='left' iconName='btn-uparrow' iconFill='#000000' onClick={() => setPages((prev) => {return prev === 0 ? prev : prev -1 })}/>
      <IconButton type="button" $size='mini' $btnType='sub' $isIconOfText='no'
        $open='right' iconName='btn-uparrow' iconFill='#000000' onClick={() => setPages((prev) => {return (length / 9) - 1 <= prev ? prev : prev + 1 })} />
    </>
  )
}
export default Todos;
