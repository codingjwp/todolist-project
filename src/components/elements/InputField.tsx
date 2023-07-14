import React, { forwardRef } from 'react';
import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import { MdDone } from 'react-icons/md';
import styled, { DefaultTheme } from 'styled-components';

/**
 * size : md (todo 수정 input)
 *        lr (todo 입력 input)
 *        full (로그인, 회원가입)
 * InputFiled 타입 정의
 */

interface InputProps {
  testname?: string;
  size?: 'md' | 'lr' | 'full';
  id?: string;
  type: HTMLInputTypeAttribute;
  name?: string;
  defaultChecked?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/** 공통 색상 */
const theme: DefaultTheme = {
  checkColor: '#3DB981',
  borderColor: '#d4d4d8',
};

const checkColor: React.CSSProperties = {
  color: theme.checkColor,
};
/** InputFiled 컴포넌트 */
export const InputField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  if (props.type !== 'checkbox')
    return (
      <InputStyle
        data-testid={props.testname}
        size={props.size}
        id={props.id}
        type={props.type}
        name={props.name}
        defaultChecked={props.defaultChecked}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        ref={ref}
      />
    );
  else
    return (
      <label>
        <InputCheckBox
          data-testid={props.testname}
          size={props.size}
          id={props.id}
          type={props.type}
          name={props.name}
          defaultChecked={props.defaultChecked}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
        />
        {props.defaultChecked ? (
          <Checked defaultChecked={props.defaultChecked}>
            <MdDone style={checkColor} />
          </Checked>
        ) : (
          <Checked />
        )}
      </label>
    );
});
/** Input 스타일 */
const InputStyle = styled.input<InputProps>`
  width: ${props => {
    if (props.size === 'full') return `320px`;
    else if (props.size === 'md') return `220px`;
    else return `270px`;
  }};

  height: 30px;
  padding: 0px 4px;

  border: 1px solid ${theme.borderColor};
  border-radius: 0.125rem;
`;
/** Input CheckBox 스타일 */
const InputCheckBox = styled.input<InputProps>`
  display: none;
`;

/** Check후 스타일 */
const Checked = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  border: 1px solid ${theme.borderColor};

  display: flex;
  justify-content: center;
  align-items: center;

  ${props => props.defaultChecked && `border-color : ${theme.checkColor};`}
`;
