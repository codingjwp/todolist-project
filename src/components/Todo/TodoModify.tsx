import { useRef } from 'react';
import { InputField } from '../elements/InputField';
import { Button } from '../elements/Button';
import { TodoBox, TodoModifyProps } from './Todo.style';

const TodoModify = ({
  id,
  todo,
  isCompleted,
  updateCheckTodo,
  setbuttonStatus,
}: TodoModifyProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <TodoBox>
        <InputField
          type='text'
          testname='modify-input'
          defaultValue={todo}
          size='md'
          ref={inputRef}
        />
        <Button
          testname='submit-button'
          type='submit'
          size='sm'
          onClick={() => {
            updateCheckTodo(id, (inputRef.current as HTMLInputElement).value, isCompleted);
            setbuttonStatus(false);
          }}>
          제출
        </Button>
        <Button
          testname='cancel-button'
          type='delete'
          size='sm'
          onClick={() => setbuttonStatus(false)}>
          취소
        </Button>
      </TodoBox>
    </>
  );
};

export default TodoModify;
