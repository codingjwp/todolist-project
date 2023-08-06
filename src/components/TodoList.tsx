import { Dispatch, SetStateAction } from 'react';
import TodoItems from "./TodoItems";
import { TodoDataProps } from "../hooks/useTodoEvent";
import { deleteTodoList, updateTodoList } from '../apis/TodoAxios'; 
import { useModalState } from '../apis/ModalContext';

interface TodoListPRops {
  todoData: TodoDataProps[];
  setTodoData: Dispatch<SetStateAction<TodoDataProps[]>>;
}

const TodoList = ({ todoData, setTodoData }: TodoListPRops) => {
  const { setModalData } = useModalState();

  const deleteTodoListApi = async (id : string) => {
    const res = await deleteTodoList(id);
    if (res.status >= 400) setModalData({ modalOpen: true, modalType: "error", modalMsg: res.data});
    else setTodoData(prev => { return prev.filter(item => +item.id !== +id)});
  }

  const updateTodoListApi = async (id: string, isCompleted: boolean, todo: string) => {
    const res = await updateTodoList(id, isCompleted, todo);
    if (res.status >= 400) setModalData({ modalOpen: true, modalType: "error", modalMsg: res.data});
    else {
        setTodoData(prev => { return prev.map(item => {
        if (+item.id === +id) {
          item.isCompleted = isCompleted
          item.todo = todo
        } 
        return item;
      })});
    }
  }
  const detailTodoOpen = (todo: string) => {
    setModalData({ modalOpen: true, modalType: "detail", modalMsg: todo})
  }

  return (
    <>
      {todoData && todoData.map((item) => { 
        return <TodoItems key={item.id} id={item.id} isCompleted={item.isCompleted} todo={item.todo}
          deleteTodoListApi={deleteTodoListApi} updateTodoListApi={updateTodoListApi} detailTodoOpen={detailTodoOpen} />
      })}
    </>
  );
};

export default TodoList;