import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useModalState } from '../hooks/useModalState';
import { getTodoList } from '../apis/TodoAxios';

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
  const todoSort = todoData
    .sort((a, b) => {
      return +b.id - +a.id;
    })
    .slice(pages * 9, (pages + 1) * 9);

  useEffect(() => {
    const getTodoListApi = () => {
      getTodoList()
        .then((res) => {
          if (res.status >= 400)
            setModalData({ modalOpen: true, modalType: 'error', modalMsg: res.data as string });
          else if (typeof res.data !== 'string') setTodoData(res.data);
        })
        .catch((error) => {
          throw new Error(`에러 발생 ${String(error)}`);
        });
    };
    getTodoListApi();
  }, [setModalData]);
  return { todoData: todoSort, length, setTodoData, setPages };
};
