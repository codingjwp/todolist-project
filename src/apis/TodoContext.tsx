import { Dispatch, SetStateAction, createContext, useState, ReactNode, useContext } from 'react'

interface TodoDataProps {
  id: string;
  isCompleted: boolean;
  todo: string;
}

interface TodoStateProps {
  todoData: TodoDataProps[];
  setTodoData: Dispatch<SetStateAction<TodoDataProps[]>>;
}

const TodoState = createContext<TodoStateProps | undefined>(undefined);

export const TodoProvider = ({children}: {children: ReactNode}) => {
  const [todoData, setTodoData] = useState<TodoDataProps[]>([]);
  return (
    <TodoState.Provider value={{todoData, setTodoData}}>
      {children}
    </TodoState.Provider>
  )
}

export const useTodoState = () => {
  const context = useContext(TodoState);
  if (!context)
    throw new Error('Cannot find modalProvider');
  const todoData = context.todoData;
  const setTodoData = context.setTodoData;
  return { todoData, setTodoData}
}
