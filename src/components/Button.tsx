import { ButtonHTMLAttributes, FC } from 'react';
import styled, { css } from 'styled-components';
import {SvgIcon, SvgIconProps} from './SvgIcon';

interface ButtonStyleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $size: "basic" | "large" | "circle";
  $btnType: "primary" | "dismiss";
  $open?: "ok" | "no";
  $isIcon?: "ok" | "no";
}

export const Button: FC<ButtonStyleProps> = ({$size, $btnType, $open, ...props}) => {
  return (
    <ButtonStyle $isIcon={"no"} $size={$size} $btnType={$btnType} $open={$open} {...props}>
      {props.children}
    </ButtonStyle>
  )
}

interface IconStyleProps extends ButtonStyleProps {
  iconScale?: number;
  iconFill?: string;
  iconName: SvgIconProps["iconName"];
}

export const IconButton: FC<IconStyleProps> = ({$size, $btnType, $open, iconName, iconScale, iconFill, ...props}) => {
  return (
    <ButtonStyle $isIcon={"ok"} $size={$size} $btnType={$btnType} $open={$open} {...props}>
      <SvgIcon iconName={iconName} transform={`scale(${iconScale})`} fill={iconFill} />
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
    width: 4rem;
    border-radius: 50%;
  `,
}

const ButtonStyle = styled.button<ButtonStyleProps>`
  cursor: pointer;
  color: #ffffff;
  ${({$size}) => btnSize[$size]};
  ${({$btnType}) => btnTheme[$btnType]};
  ${({$isIcon}) => $isIcon === "ok" && css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    & > svg {
      margin-right: .2rem;
    }
  `}
  &:disabled {
    opacity: 0.7;
  }
`
