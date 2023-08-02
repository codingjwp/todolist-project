import { ButtonHTMLAttributes, FC } from 'react';
import styled, { css } from 'styled-components';
import {SvgIcon, SvgIconProps} from './SvgIcon';

interface ButtonStyleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $size: "basic" | "large" | "circle";
  $btnType: "primary" | "dismiss";
  $open?: boolean;
  $isIconOfText?: "ok" | "no";
}

export const Button: FC<ButtonStyleProps> = ({$size, $isIconOfText="no", $btnType, $open, ...props}) => {
  return (
    <ButtonStyle $isIconOfText={$isIconOfText} $size={$size} $btnType={$btnType} $open={$open} {...props}>
      {props.children}
    </ButtonStyle>
  )
}

interface IconStyleProps extends ButtonStyleProps {
  iconScale?: number;
  iconFill?: string;
  iconName: SvgIconProps["iconName"];
}

export const IconButton: FC<IconStyleProps> = ({$size, $btnType, $isIconOfText="ok", $open, iconName, iconScale, iconFill, ...props}) => {
  return (
    <ButtonStyle $isIconOfText={$isIconOfText} $size={$size} $btnType={$btnType} $open={$open} {...props}>
      <SvgIcon iconName={iconName} transform={`rotate(${$open ? '180 0 2': '0 0 0'}) scale(${iconScale || 1})`} fill={iconFill} />
      {props.children}
    </ButtonStyle>
  )
}

const btnTheme = {
  "primary": css`
    background-color: #2929FF;
    &:not(:disabled):hover {
      background-color: #0000C6;
    }
  `,
  "dismiss": css`
    background-color: #B31010;
    &:not(:disabled):hover {
      background-color: #840C0C;
    }
  `
};

const btnSize = {
  "basic": css`
    width: 3.5rem;
    height: 2rem;
    border-radius: .325rem;
    font-size: .8rem;
  `,
  "large": css`
    width: 100%;
    height: 3rem;
    border-radius: .625rem;
    font-size: 1.2rem;
  `,
  "circle": css`
    position: fixed;
    left: 50%;
    bottom: -2rem;
    transition: .5s;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    transform: translateX(-50%);
    z-index: 2;
  `,
}

const ButtonStyle = styled.button<ButtonStyleProps>`
  cursor: pointer;
  color: #ffffff;
  &:disabled {
    opacity: 0.7;
  }
  ${({$size}) => btnSize[$size]};
  ${({$btnType}) => btnTheme[$btnType]};
  ${({$isIconOfText}) => $isIconOfText === "ok" && css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    & > svg {
      margin-right: .2rem;
    }
  `}
  
`
