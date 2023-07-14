import { InputField } from '../elements/InputField';
import { Button } from '../elements/Button';
import { TodoItemProps, TodoBox, TodoTitle } from './Todo.style';

export default function TodoItem({
  id,
  todo,
  isCompleted,
  updateCheckTodo,
  setbuttonStatus,
  deletebutton,
}: TodoItemProps) {
  return (
    <>
      <TodoBox>
        <InputField
          defaultChecked={isCompleted}
          type='checkbox'
          onChange={() => {
            updateCheckTodo(id, todo, !isCompleted);
          }}
        />
        <TodoTitle id={id} checked={isCompleted}>
          {todo}
        </TodoTitle>
        <Button
          testname='modify-button'
          onClick={() => setbuttonStatus(true)}
          size='sm'
          type='edit'>
          수정
        </Button>
        <Button testname='delete-button' onClick={() => deletebutton(id)} size='sm' type='delete'>
          삭제
        </Button>
      </TodoBox>
    </>
  );
}
