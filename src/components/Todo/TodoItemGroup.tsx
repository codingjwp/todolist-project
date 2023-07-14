import { useEffect, useState } from 'react';
import { getTodosList, updateTodoAxios, deleteTodoAxios } from '../../apis/TodoAxios';
import { TodoItemGroupProps } from './Todo.style';
import TodoTrans from './TodoTrans';
import TodoCreate from './TodoCreate';

export default function TodoItemGroup() {
  const [todoItemData, setTodoItemData] = useState<TodoItemGroupProps[]>([]);

  async function getTodoItemRender() {
    const todoData = await getTodosList();
    if (todoData.status !== 200) {
      alert('목록을 가져오지 못했습니다.');
      return;
    }
    setTodoItemData(todoData.data);
  }

  useEffect(() => {
    getTodoItemRender();
  }, []);

  async function deleteTodoRender(id: string) {
    const res = await deleteTodoAxios(id);
    if (res.status !== 204) {
      alert('삭제 목록을 찾지 못했습니다.');
      return;
    }
    setTodoItemData(prev => prev.filter(todo => todo.id !== id));
  }

  const updateCheckTodo = async (id: string, todo: string, isCompleted: boolean) => {
    const status = await updateTodoAxios(id, todo, isCompleted);
    if (status.status !== 200) {
      alert('입력 값이 없습니다.');
      return;
    }
    const data = todoItemData.map(todo => {
      return todo.id === status.data.id
        ? {
            ...todo,
            isCompleted: status.data.isCompleted,
            todo: status.data.todo,
          }
        : todo;
    });
    setTodoItemData(data);
  };

  return (
    <>
      <TodoCreate todoItemData={todoItemData} setTodoItemData={setTodoItemData} />
      {todoItemData &&
        todoItemData.map((v, i) => (
          <div key={i}>
            <TodoTrans
              id={v.id}
              todo={v.todo}
              isCompleted={v.isCompleted}
              userId={v.userId}
              updateCheckTodo={updateCheckTodo}
              deletebutton={deleteTodoRender}
            />
          </div>
        ))}
    </>
  );
}
