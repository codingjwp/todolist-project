import {FC, InputHTMLAttributes, forwardRef } from 'react';;
import styled, {css} from 'styled-components';
import { SvgIcon } from './SvgIcon';


interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement>{
  type?: "text" | "password";
  isCompleted?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({type, ...props}, ref) => {
    return (
      <InputLabel>
        <InputFieldBase ref={ref} type={type} {...props} />
      </InputLabel>
    );
});

export const CheckBoxField: FC<InputFieldProps> = ({type, isCompleted, ...props}) => {
  return (
    <InputLabel $check='check'>
      <InputFieldBase type={type ? 'checkbox' : 'checkbox'} $ishidden={true} defaultChecked={isCompleted} {...props}/>
      <SvgIcon iconName={isCompleted ? 'checkbox' : 'uncheckbox'} fill={isCompleted ? '#2929FF' : '#000000'} />
    </InputLabel>
  )
} 

const InputLabel= styled.label<{$check?: string}>`
  width: ${props => props.$check !== 'check' && '100%'};
  cursor: ${props => props.$check === 'check' && 'pointer'};
`

const InputFieldBase = styled.input<{$ishidden?: boolean}>`
  width: 100%;
  font-size: 1.2rem;
  padding: .3rem;
  border-radius: 5px;
  border: 1px solid black;
  ${props => props.$ishidden === true && css`
    pointer-events: none;
    display: none;
  `}
`;
