import { FormEvent, useState } from "react";
import styled, {css} from 'styled-components';
import { IconButton } from "./Button";
import { InputField } from "./InputField";
import { createTodoList } from '../apis/TodoAxios';
import { useModalState } from '../apis/ModalContext';
import { TodoStateProps } from "../hooks/useTodoEvent";

const TodoCreate = ({setTodoData}: TodoStateProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const btnType = isOpen ? "dismiss" : 'primary';
  const { setModalData } = useModalState();
  const createTodoOpen = () => {
    setIsOpen((prev) => !prev);
    const form = document.querySelector('form');
    form?.reset();
  }
  const postTodoCreateApi = async (e: FormEvent) => {
    e.preventDefault();
    const form = (e.target as HTMLFormElement);
    const formData = new FormData(form);
    const todoDetail = formData.get('create');
    const res = await createTodoList(todoDetail as string);
    if (res.status >= 400) {
      setModalData({
        modalOpen: true,
        modalType: "error",
        modalMsg: res.data,
      })
      form.reset();
      return;
    }
    setTodoData((prev) => [...prev, res.data]);
    form.reset();
  }

  return (
  <>
    <ToDoCreateBase $isopen={isOpen} onSubmit={postTodoCreateApi}>
      <InputField aria-label="create-todo-text" name="create" type="text" />
      <IconButton aria-label="create-todo-btn" type="submit" $size="basic" $btnType="primary"
      iconName="btn-send" iconFill='#ffffff' $isIconOfText="no" />
    </ToDoCreateBase>
    <IconButton aria-label="create-todo-btn" type="button" iconName="btn-uparrow" iconScale={1.5} iconFill="#ffffff" 
    $size="circle" $btnType={btnType} $open={isOpen} $isIconOfText={"no"} onClick={createTodoOpen}/>
  </>
  )
}

const openStyle = {
  'false': css`
    display: none;
  `,
  'true': css`
    display: grid;
    grid-template-columns: 1fr 3.5rem;
    grid-column-gap: 1rem;
    padding: 1rem;
  `
}
const ToDoCreateBase = styled.form<{$isopen: boolean}>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 18%;
  border-radius: 3px;
  background-color: #E9ECEA;
  ${({$isopen}) => openStyle[`${$isopen}`]};
`
export default TodoCreate;