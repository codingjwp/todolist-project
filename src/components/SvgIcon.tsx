import { FC, SVGProps } from 'react';
import svg from '../assets/btnicon.svg';

export interface SvgIconProps extends SVGProps<SVGSVGElement> {
  iconName:
    | 'btn-edit'
    | 'btn-delete'
    | 'btn-send'
    | 'btn-send-cancel'
    | 'btn-uparrow'
    | 'btn-close'
    | 'checkbox'
    | 'uncheckbox';
  $direction?: 'up' | 'down' | 'left' | 'right';
}

export const SvgIcon: FC<SvgIconProps> = ({ iconName, $direction = 'down', ...props }) => {
  const rotate = {
    up: `rotate(180 0 2)`,
    down: `rotate(0 0 0)`,
    left: `rotate(270 0 2)`,
    right: `rotate(90 0 2)`,
  };
  return (
    <svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      transform={rotate[$direction]}
      viewBox='0 0 24 24'
      {...props}
      xmlns='http://www.w3.org/2000/svg'>
      <use href={`${svg}#${iconName}`} />
    </svg>
  );
};
