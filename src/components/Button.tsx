import { ButtonHTMLAttributes, FC } from 'react';
import styled, { css } from 'styled-components';
import {SvgIcon, SvgIconProps} from './SvgIcon';

interface ButtonStyleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size : "basic" | "large" | "circle";
  btnType: "primary" | "dismiss";
  open?: boolean;
  icon?: boolean;
}

export const Button: FC<ButtonStyleProps> = ({size, btnType, open, ...props}) => {
  return (
    <ButtonStyle icon={false} size={size} btnType={btnType} open={open} {...props}>
      {props.children}
    </ButtonStyle>
  )
}

interface IconStyleProps extends ButtonStyleProps {
  iconWidth?: number;
  iconHeight?: number;
  iconFill?: string;
  iconName: SvgIconProps["iconName"];
}

export const IconButton: FC<IconStyleProps> = ({size, btnType, open, iconName, iconWidth, iconHeight, iconFill, ...props}) => {
  return (
    <ButtonStyle icon={true} size={size} btnType={btnType} open={open} {...props}>
      <SvgIcon iconName={iconName} width={iconWidth} height={iconHeight} fill={iconFill} />
      {props.children}
    </ButtonStyle>
  )
}

const btnTheme = {
  "primary": css`
    background-color: #398F69;
    &:hover {
      filter: brightness(.8);
    }
  `,
  "dismiss": css`
    background-color: #EF3D33;
    &:hover {
      filter: brightness(.8);
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
  ${({size}) => btnSize[size]};
  ${({btnType}) => btnTheme[btnType]};
  ${({icon}) => icon && css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    & > svg {
      margin-right: .2rem;
    }
  `}
`
