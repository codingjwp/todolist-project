import { useState, useRef } from 'react';
import styled from 'styled-components';
import { IconButton } from './Button';
import { CheckBoxField, InputField } from './InputField';

interface TodoDataProps {
    id: string;
    todo: string;
    isCompleted: boolean;
    detailOfModify?: () => void;
    updateTodoListApi: (id: string, isCompleted: boolean, todo: string) => Promise<void>;
}
interface TodoDetailProps extends TodoDataProps {
    deleteTodoListApi: (id: string) => Promise<void>;
    detailTodoOpen: (todo: string) => void;
}


const TodoDetail = ({id, isCompleted, todo, detailOfModify, deleteTodoListApi, updateTodoListApi, detailTodoOpen}: TodoDetailProps) => {

    return(
        <TodoItemBase aria-label={`todo-detail-${id}`}>
            <CheckBoxField aria-label={`detail-check-${id}`} isCompleted={isCompleted} onClick={() => updateTodoListApi(id, !isCompleted, todo)} />
            <TodoContent onClick={() => detailTodoOpen(todo)}>{todo}</TodoContent>
            <IconButton aria-label={`detail-edit-${id}`} iconName='btn-edit' iconFill='#ffffff' iconWidth="24" iconHeight="24" 
            type='button' $size='basic' $isIconOfText='no' $btnType='primary' onClick={detailOfModify} />
            <IconButton aria-label={`detail-delete-${id}`} iconName='btn-delete' iconFill='#ffffff' iconWidth="24" iconHeight="24" 
            type='button' $size='basic' $isIconOfText='no' $btnType='dismiss' onClick={() => deleteTodoListApi(id)} />
        </TodoItemBase>)
}

const TodoModify = ({id, isCompleted, todo, detailOfModify, updateTodoListApi}: TodoDataProps) => {
    const modifyRef = useRef<HTMLInputElement>(null);
    return (
        <TodoItemBase aria-label={`todo-modify-${id}`}>
            <InputField ref={modifyRef} aria-label={`modify-text-${id}`} name={`modify-text-${id}`} type='text' defaultValue={todo} />
            <IconButton aria-label={`modify-send-${id}`} iconName='btn-send' iconFill='#ffffff' iconWidth="24" iconHeight="24" 
            type='button' $size='basic' $isIconOfText='no' $btnType='primary' onClick={() => {
                 updateTodoListApi(id, isCompleted, (modifyRef.current as HTMLInputElement).value);
                 if (detailOfModify) detailOfModify();
                }
                } />
            <IconButton aria-label={`modify-cancel-${id}`} iconName='btn-send-cancel' iconFill='#ffffff' iconWidth="24" iconHeight="24" 
            type='button' $size='basic' $isIconOfText='no' $btnType='dismiss' onClick={detailOfModify} />
        </TodoItemBase>)
}

const TodoItems = ({id, isCompleted, todo, deleteTodoListApi, updateTodoListApi, detailTodoOpen}: TodoDetailProps) => {
    const [change, setChange] = useState(true);
    const detailOfModify = () => {setChange((prev) => !prev)}

    return (
        change ? 
        <TodoDetail id={id} isCompleted={isCompleted} todo={todo} detailOfModify={detailOfModify} deleteTodoListApi={deleteTodoListApi} updateTodoListApi={updateTodoListApi} detailTodoOpen={detailTodoOpen} />
        : <TodoModify id={id} isCompleted={isCompleted} todo={todo} detailOfModify={detailOfModify} updateTodoListApi={updateTodoListApi} />
    );
}

const TodoItemBase = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: .3rem;
`
const TodoContent = styled.span`
    max-width: 13rem;
    width: 100%;
    margin-left: .4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    user-select: none;
`
export default TodoItems;