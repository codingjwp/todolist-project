import { Dispatch, SetStateAction } from 'react';
import TodoItems from "./TodoItems";
import { TodoDataProps } from "../hooks/useTodoEvent";
import { deleteTodoList, updateTodoList } from '../apis/TodoAxios'; 
import { useModalState } from '../hooks/useModalState';

interface TodoListPRops {
  todoData: TodoDataProps[];
  setTodoData: Dispatch<SetStateAction<TodoDataProps[]>>;
}

const TodoList = ({ todoData, setTodoData }: TodoListPRops) => {
  const { setModalData } = useModalState();

  const deleteTodoListApi = (id : string) => {
    deleteTodoList(id).then((res) => {
      if (res.status >= 400) setModalData({ modalOpen: true, modalType: "error", modalMsg: res.data});
      else setTodoData(prev => { return prev.filter(item => +item.id !== +id)});
    }).catch((error) => {
      throw new Error(`에러 발생 ${String(error)}`);
    });;
  }

  const updateTodoListApi = (id: string, isCompleted: boolean, todo: string) => {
    updateTodoList(id, isCompleted, todo).then((res) => {
      if (res.status >= 400) setModalData({ modalOpen: true, modalType: "error", modalMsg: res.data as string});
      else {
          setTodoData(prev => { return prev.map(item => {
          if (+item.id === +id) {
            item.isCompleted = isCompleted
            item.todo = todo
          } 
          return item;
        })});
      }
    }).catch(error => {
      throw new Error(`에러 발생 ${String(error)}`);
    });

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