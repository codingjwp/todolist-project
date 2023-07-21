import React from 'react';
import styled from 'styled-components';

/** 공통 타입 정의 */
export interface TodoProps {
  id: string;
  todo: string;
  isCompleted: boolean;
  userId: string;
}

/** TodoItemGroup 타입 정의 */
export interface TodoItemGroupProps extends TodoProps {
  updateCheckTodo: (
    id: string,
    todo: string,
    isCompleted: boolean,
  ) => Promise<void>;
}

export type SetTodoItemData = React.Dispatch<
  React.SetStateAction<TodoItemGroupProps[]>
>;

/** TodoModify 타입 정의 */
export interface TodoModifyProps extends TodoProps {
  setbuttonStatus: (active: boolean) => void;
  updateCheckTodo: (
    id: string,
    todo: string,
    isCompleted: boolean,
  ) => Promise<void>;
}

/** TodoTrans 타입 정의 */
export interface TodoTransProps extends TodoProps {
  updateCheckTodo: (
    id: string,
    todo: string,
    isCompleted: boolean,
  ) => Promise<void>;
  deletebutton: (id: string) => void;
}

/** TodoItemProps 타입 정의 */
export interface TodoItemProps extends TodoProps {
  updateCheckTodo: (id: string, todo: string, isCompleted: boolean) => void;
  setbuttonStatus: (active: boolean) => void;
  deletebutton: (id: string) => void;
}

/** TodoCreate의 기본 베이스 스타일 */
export const TodoCreateBase = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 24rem;
  padding: 32px 32px 72px;
  background-color: #f1f5f9;
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  border-top: 1px solid #d4d4d8;
  display: flex;
  justify-content: space-between;
`;

/** TodoItem base li 스타일 */
export const TodoBox = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;
/** TodoItem 타이틀 스타일 */
export const TodoTitle = styled.span<{ checked: boolean }>`
  width: 200px;
  ${(props) => props.checked && `color : #D4D4D8`}
`;
