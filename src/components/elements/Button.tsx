import { MouseEvent, ReactNode } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { MdAdd } from 'react-icons/md';

/**
 * type : submit (제출), edit (수정), delete (삭제), plus(+버튼)
 * size : sm (todo 제출, 수정, 삭제)
 *        md
 *        lr (로그인, 회원가입 버튼)
 * Button 타입 저으이
 */
interface ButtonProps {
  testname?: string;
  type: 'submit' | 'edit' | 'delete' | 'plus';
  open?: boolean;
  name?: string;
  size?: 'sm' | 'md' | 'lr';
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}
/** 공통 색상  */
const theme: DefaultTheme = {
  submit: '#6EE7B7',
  delete: '#F87171',
  disabledSubmit: '#A7F3D0',
  hoverSubmit: '#34D399',
  hoverDelete: '#EF4444',
};
/** Button 컴포넌트  */
export const Button = ({
  testname,
  type,
  open,
  name,
  size,
  disabled,
  onClick,
  children,
}: ButtonProps) => {
  if (type === 'plus') {
    return (
      <PlusButton
        data-testid={testname}
        type={type}
        open={open}
        name={name}
        size={size}
        disabled={disabled}
        onClick={onClick}>
        <MdAdd />
      </PlusButton>
    );
  } else
    return (
      <ButtonStyle
        data-testid={testname}
        type={type}
        name={name}
        size={size}
        disabled={disabled}
        onClick={onClick}>
        {children}
      </ButtonStyle>
    );
};
/** + 버튼 스타일 */
const PlusButton = styled.button<ButtonProps>`
  z-index: 10;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;

  position: absolute;
  left: 50%;
  bottom: 0;
  transform: ${props =>
    props.open ? `translate(-50%, 50%) rotate(45deg);` : `translate(-50%, 50%)`};

  color: white;
  border-radius: 9999px;
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  transition-duration: 100ms;

  background-color: ${props => (props.open ? `${theme.delete}` : `${theme.submit}`)};

  &:hover {
    background-color: ${props => (props.open ? `${theme.hoverDelete}` : `${theme.hoverSubmit}`)};
  }

  cursor: pointer;
`;
/** 기본 버튼 스타일 */
const ButtonStyle = styled.button<ButtonProps>`
  width: ${props => {
    if (props.size === 'sm') return `42px`;
    else if (props.size === 'md') return `80px`;
    else return `320px`;
  }};

  height: ${props => {
    if (props.size === 'sm') return `30px`;
    else return `40px`;
  }};

  padding: ${props => {
    if (props.size === 'sm') return `0px 4px`;
    else return `8px 12px`;
  }};

  border: 0px;
  border-radius: 0.125rem;

  font-weight: 600;
  color: white;

  background-color: ${props => {
    if (props.disabled) return theme.disabledSubmit;
    else {
      if (props.type === 'submit' || props.type === 'edit') {
        return theme.submit;
      } else return theme.delete;
    }
  }};

  &:hover {
    background-color: ${props => {
      if (!props.disabled) {
        if (props.type === 'submit' || props.type === 'edit') {
          return theme.hoverSubmit;
        } else return theme.hoverDelete;
      }
    }};
  }

  cursor: pointer;
`;
