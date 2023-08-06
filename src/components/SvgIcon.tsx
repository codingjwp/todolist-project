import { FC, SVGProps } from "react";
import svg from '../assets/btnicon.svg'

export interface SvgIconProps extends SVGProps<SVGSVGElement> {
  iconName: "btn-edit" | "btn-delete" | "btn-send" | "btn-send-cancel" | "btn-uparrow" | "btn-close" | "checkbox" | "uncheckbox";
  iconScale?: number;
  $open: "true" | "false" | "left" | "right";
  
}

export const SvgIcon: FC<SvgIconProps> = ({iconName, iconScale, $open, ...props}) => {
  const rotate = {
    "true": `rotate(180 0 2) scale(${iconScale || 1})`,
    "false": `rotate(0 0 0) scale(${iconScale || 1})`,
    "left": `rotate(270 0 2) scale(${iconScale || 1})`,
    "right": `rotate(90 0 2) scale(${iconScale || 1})`,
  }

  return (
    <svg width={24} height={24} transform={rotate[$open]} viewBox="0 0 24 24" {...props} xmlns="http://www.w3.org/2000/svg">
      <use href={`${svg}#${iconName}`} />
    </svg>
  )
}