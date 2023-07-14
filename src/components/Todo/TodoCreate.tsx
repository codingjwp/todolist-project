import { useRef, useState } from 'react';
import { Button } from '../elements/Button';
import { InputField } from '../elements/InputField';
import { createTodosList } from '../../apis/TodoAxios';
import { TodoItemGroupProps, SetTodoItemData, TodoCreateBase } from './Todo.style';

const TodoCreate = ({
  todoItemData,
  setTodoItemData,
}: {
  todoItemData: TodoItemGroupProps[];
  setTodoItemData: SetTodoItemData;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [toDoIsOpen, setToDoIsOpen] = useState(false);

  const openHandler = () => {
    setToDoIsOpen(!toDoIsOpen);
  };

  const handleToDoCreateApiClick = async () => {
    const res = await createTodosList((inputRef.current as HTMLInputElement).value);
    if (res.status === 400) {
      alert('입력값이 빈 값 입니다.');
      return;
    } else if (res.status === 201) {
      setTodoItemData([...todoItemData, res.data]);
      (inputRef.current as HTMLInputElement).value = '';
    }
  };

  return (
    <>
      {toDoIsOpen && (
        <TodoCreateBase>
          <InputField
            placeholder='할 일 입력'
            testname='new-todo-input'
            size='lr'
            type='text'
            ref={inputRef}
          />
          <Button
            testname='new-todo-add-button'
            size='sm'
            type='submit'
            onClick={handleToDoCreateApiClick}>
            저장
          </Button>
        </TodoCreateBase>
      )}
      <Button type='plus' open={toDoIsOpen} onClick={openHandler} />
    </>
  );
};

export default TodoCreate;
