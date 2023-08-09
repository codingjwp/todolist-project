import { useNavigate } from "react-router-dom";
import TodoCreate from "../components/TodoCreate";
import TodoList from "../components/TodoList";
import { Button, IconButton } from "../components/Button";
import { useTodoEvent } from "../hooks/useTodoEvent";

const Todos = () => {
  const navigate = useNavigate();
  const {todoData, length, setTodoData, setPages } = useTodoEvent();
  const logoutMoveHome = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  }
  return (
    <>
      <TodoList todoData={todoData} setTodoData={setTodoData} />
      <TodoCreate setTodoData={setTodoData} />
      <IconButton type="button" $size='mini' $btnType='sub' $isIconOfText='no' iconWidth="24" iconHeight="24" 
        $direction='left' iconName='btn-uparrow' iconFill='#000000' onClick={() => setPages((prev) => {return prev === 0 ? prev : prev -1 })}/>
      <IconButton type="button" $size='mini' $btnType='sub' $isIconOfText='no' iconWidth="24" iconHeight="24" 
        $direction='right' iconName='btn-uparrow' iconFill='#000000' onClick={() => setPages((prev) => {return (length / 9) - 1 <= prev ? prev : prev + 1 })} />
      <Button type="button" $size='logout' $btnType="dismiss" onClick={logoutMoveHome}>로그아웃</Button>
    </>
  )
}
export default Todos;
