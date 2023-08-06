import { ButtonHTMLAttributes, FC } from 'react';
import styled, { css } from 'styled-components';
import {SvgIcon, SvgIconProps} from './SvgIcon';

interface ButtonStyleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $size: "basic" | "large" | "circle" | "mini";
  $btnType: "primary" | "dismiss" | "sub";
  $open?: boolean | "left" | "right";
  $isIconOfText?: "ok" | "no";
}

export const Button: FC<ButtonStyleProps> = ({$size, $isIconOfText="no", $btnType, ...props}) => {
  return (
    <ButtonStyle $isIconOfText={$isIconOfText} $size={$size} $btnType={$btnType} {...props}>
      {props.children}
    </ButtonStyle>
  )
}

export interface IconStyleProps extends ButtonStyleProps {
  iconScale?: number;
  iconFill?: string;
  iconName: SvgIconProps["iconName"];
}

export const IconButton: FC<IconStyleProps> = ({$size, $btnType, $isIconOfText="ok", $open, iconName, iconScale, iconFill, ...props}) => {
  return (
    <ButtonStyle $isIconOfText={$isIconOfText} $open={$open} $size={$size} $btnType={$btnType} {...props}>
      <SvgIcon aria-label={props['aria-label']} iconName={iconName} $open={`${$open ?? false}`} iconScale={iconScale} fill={iconFill} />
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
  `,
  "sub": css`
    background-color: #bfbfff;
  `
};

const btnSize = {
  "basic": css`
    min-width: 2rem;
    height: 2rem;
    border-radius: .325rem;
    font-size: .8rem;
    margin-left: .5rem;
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
  "mini": css`
    position: fixed;
    justify-content: center;
    align-items: center;
    top: 50%;
    transform: translateY(-50%);
    width: 3rem;
    height: 3rem;
    z-index: 2;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease-out;
    &:hover, &:focus {
      opacity: 1;
    }
  `
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
  left: ${({$open}) => $open === 'left' && '-1.5rem'};
  right: ${({$open}) => $open === 'right' && '-1.5rem'};
`
