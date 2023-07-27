import {FC, InputHTMLAttributes, forwardRef } from 'react';;
import styled, {css} from 'styled-components';


interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement>{
  type?: "text" | "password";
  $ishidden?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({type, ...props}, ref) => {
    return (
      <label>
        <InputFieldBase ref={ref} type={type} {...props} />
      </label>
    );
});

export const CheckBoxField: FC<InputFieldProps> = ({$ishidden, type, ...props}) => {
  return (
    <label>
      <InputFieldBase type='checkbox' checked={props.checked} $ishidden={$ishidden} {...props}/>
      <CheckBoxBase checked={props.checked}>
        {props.checked ? '✔️' : ''}
      </CheckBoxBase>
    </label>
  )
} 

const CheckBoxBase = styled.div<{checked?: boolean}>`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  text-align: center;
  font-size: 1.1rem;
  border: ${props => props.checked === true ? '2px solid #635994' : '2px solid #000000'};
  border-radius: 50%;
  cursor: pointer;
`

const InputFieldBase = styled.input<{$ishidden?: boolean}>`
  width: 100%;
  font-size: 1.2rem;
  padding: .3rem;
  border: 1px solid black;
  ${props => props.$ishidden === true && css`
    display: none;
  `}
`;
