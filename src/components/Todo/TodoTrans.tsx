import { useState } from 'react';
import { TodoTransProps } from './Todo.style';
import TodoItem from './TodoItem';
import TodoModify from './TodoModify';

export default function TodoTrans({
  id,
  todo,
  isCompleted,
  userId,
  updateCheckTodo,
  deletebutton,
}: TodoTransProps) {
  const [buttonStatus, setbuttonStatus] = useState<Boolean>(false);
  return (
    <div>
      {!buttonStatus ? (
        <TodoItem
          id={id}
          todo={todo}
          isCompleted={isCompleted}
          userId={userId}
          setbuttonStatus={setbuttonStatus}
          updateCheckTodo={updateCheckTodo}
          deletebutton={deletebutton}
        />
      ) : (
        <TodoModify
          id={id}
          todo={todo}
          isCompleted={isCompleted}
          userId={userId}
          setbuttonStatus={setbuttonStatus}
          updateCheckTodo={updateCheckTodo}
        />
      )}
    </div>
  );
}
