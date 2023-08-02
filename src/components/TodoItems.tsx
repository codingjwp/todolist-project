import styled from 'styled-components';
import { IconButton } from './Button';
import { CheckBoxField, InputField } from './InputField';
import { ChangeEvent } from 'react';

interface TodoDataProps {
    id: string;
    isCompleted?: boolean;
    todo: string;
}

const TodoDetail = ({id, isCompleted, todo}: TodoDataProps) => {

    const test = (e: ChangeEvent) => {
        (e.target as HTMLInputElement).defaultChecked = !isCompleted
        console.log((e.target as HTMLInputElement).defaultChecked);
    }

    return(
        <TodoItemBase aria-label={`todo-detail-${id}`}>
            <CheckBoxField aria-label={`detail-check-${id}`} defaultChecked={isCompleted} checked={isCompleted} onChange={test} />
            <TodoContent>{todo}</TodoContent>
            <IconButton aria-label={`detail-edit-${id}`} iconName='btn-edit' iconFill='#ffffff' 
            type='button' $size='basic' $isIconOfText='no' $btnType='primary' />
            <IconButton aria-label={`detail-delte-${id}`} iconName='btn-delete' iconFill='#ffffff' 
            type='button' $size='basic' $isIconOfText='no' $btnType='dismiss' />
        </TodoItemBase>)
}

const TodoModify = ({id, todo}: TodoDataProps) => {
    return (
        <TodoItemBase aria-label={`todo-modify-${id}`}>
            <InputField aria-label={`modify-text-${id}`} type='text' defaultValue={todo} />
            <IconButton aria-label={`modify-send-${id}`} iconName='btn-send' iconFill='#ffffff' 
            type='button' $size='basic' $isIconOfText='no' $btnType='primary' />
            <IconButton aria-label={`modify-cancel-${id}`} iconName='btn-send-cancel' iconFill='#ffffff' 
            type='button' $size='basic' $isIconOfText='no' $btnType='dismiss' />
        </TodoItemBase>)
}

const TodoItems = () => {
    return (<TodoDetail id={'1'} todo='테스트용'/>)
}

const TodoItemBase = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`
const TodoContent = styled.span`
    width: 100%;
    margin-left: .5rem;
`

export default TodoItems;