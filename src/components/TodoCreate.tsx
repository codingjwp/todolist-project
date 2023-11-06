import { FormEvent, useState } from 'react';
import styled, { css } from 'styled-components';
import { IconButton } from './Button';
import { InputField } from './InputField';
import { createTodoList } from '../apis/TodoAxios';
import { useModalState } from '../hooks/useModalState';
import { TodoDataProps, TodoStateProps } from '../hooks/useTodoEvent';

type IsOpenType = 'up' | 'down';

const TodoCreate = ({ setTodoData }: TodoStateProps) => {
  const [isOpen, setIsOpen] = useState<IsOpenType>('down');
  const btnType = isOpen === 'up' ? 'dismiss' : 'primary';
  const { setModalData } = useModalState();
  const createTodoOpen = () => {
    setIsOpen((prev) => (prev === 'up' ? 'down' : 'up'));
    const form = document.querySelector('form');
    form?.reset();
  };
  const postTodoCreateApi = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const todoDetail = formData.get('create');
    createTodoList(todoDetail as string)
      .then((res) => {
        if (res.status >= 400) {
          setModalData({
            modalOpen: true,
            modalType: 'error',
            modalMsg: res.data as string,
          });
        } else {
          setTodoData((prev) => [res.data as TodoDataProps, ...prev]);
        }
      })
      .catch((error) => {
        setModalData({
          modalOpen: true,
          modalType: 'error',
          modalMsg:
            error instanceof Error
              ? `${error.name}\n${error.message}`
              : 'API Server is Network Error',
        });
      });
    form.reset();
  };

  return (
    <>
      <ToDoCreateBase $isopen={isOpen} onSubmit={postTodoCreateApi}>
        <InputField aria-label='create-todo-text' name='create' type='text' />
        <IconButton
          aria-label='create-todo-btn'
          type='submit'
          $size='basic'
          $btnType='primary'
          iconName='btn-send'
          iconFill='#ffffff'
          $isIconOfText='no'
          iconWidth='24'
          iconHeight='24'
        />
      </ToDoCreateBase>
      <IconButton
        aria-label='create-todo-btn'
        type='button'
        iconName='btn-uparrow'
        iconWidth='48'
        iconHeight='48'
        iconFill='#ffffff'
        $size='circle'
        $btnType={btnType}
        $direction={isOpen}
        $isIconOfText={'no'}
        onClick={createTodoOpen}
      />
    </>
  );
};

const openStyle = {
  down: css`
    display: none;
  `,
  up: css`
    display: grid;
    grid-template-columns: 1fr 3.5rem;
    grid-column-gap: 1rem;
    padding: 1rem;
  `,
};
const ToDoCreateBase = styled.form<{ $isopen: IsOpenType }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 18%;
  border-radius: 3px;
  background-color: #e9ecea;
  ${({ $isopen }) => openStyle[`${$isopen}`]};
`;
export default TodoCreate;
