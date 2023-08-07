import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useModalState } from "../apis/ModalContext";
import { getTodoList } from "../apis/TodoAxios";

export interface TodoDataProps {
  id: string;
  isCompleted: boolean;
  todo: string;
  userId: string;
}

export interface TodoStateProps {
  setTodoData: Dispatch<SetStateAction<TodoDataProps[]>>;
}

export const useTodoEvent = () => {
  const [todoData, setTodoData] = useState<TodoDataProps[]>([]);
  const length = todoData.length;
  const [pages, setPages] = useState(0);
  const { setModalData } = useModalState();
  const todoSort = todoData.sort((a, b) => {return +b.id - +a.id}).slice(pages * 9, (pages + 1) * 9);

  const getTodoListApi = async () => {
    const res = await getTodoList();
    if (res.status >= 400)
      setModalData({ modalOpen: true, modalType: "error", modalMsg: res.data});
    else 
      setTodoData(res.data);
  }
  useEffect(() => {
    getTodoListApi();
  }, [])
  return { todoData: todoSort, length, setTodoData, setPages };
}
