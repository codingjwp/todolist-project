import { ButtonHTMLAttributes, FC } from 'react';
import styled, { css } from 'styled-components';
import {SvgIcon, SvgIconProps} from './SvgIcon';

interface ButtonStyleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $size: "basic" | "large" | "circle" | "mini" | "logout";
  $btnType: "primary" | "dismiss" | "sub";
  $direction?: "up" | "down" | "left" | "right";
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
  iconFill?: string;
  iconName: SvgIconProps["iconName"];
  iconWidth?: string,
  iconHeight?: string,
}

export const IconButton: FC<IconStyleProps> = ({$size, $btnType, $isIconOfText="ok", $direction, iconName, iconFill, iconWidth, iconHeight, ...props}) => {
  return (
    <ButtonStyle $isIconOfText={$isIconOfText} $direction={$direction} $size={$size} $btnType={$btnType} {...props}>
      <SvgIcon aria-label={props['aria-label']} iconName={iconName} $direction={$direction || 'down'} width={iconWidth} height={iconHeight}  fill={iconFill} />
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
    transform: translateX(-50%);
    transition: .5s;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
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
    &:hover {
      opacity: 1;
    }
  `,
  "logout": css`
    position: absolute;
    top: 1rem;
    right: 1rem;
    min-width: 2rem;
    height: 2rem;
    border-radius: .325rem;
    font-size: .8rem;
    padding: .3rem;
  `
}
const btnDirection = {
  "left": css`
    left: -1.5rem;
  `,
  "right": css`
    right: -1.5rem;
  `,
}

const ButtonStyle = styled.button<ButtonStyleProps>`
  cursor: pointer;
  color: #ffffff;
  &:disabled {
    opacity: 0.7;
  }
  ${({$direction}) => !($direction === undefined || $direction === "up" || $direction === "down")  && btnDirection[$direction]};
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
