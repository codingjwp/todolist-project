import { FC, SVGProps } from "react";
import svg from '../assets/btnicon.svg'

export interface SvgIconProps extends SVGProps<SVGSVGElement> {
  iconName: "btn-edit" | "btn-delete" | "btn-send" | "btn-send-cancel" | "btn-uparrow" | "btn-close";
}

export const SvgIcon: FC<SvgIconProps> = ({iconName, ...props}) => {
  return (
    <svg aria-label={iconName} width={24} height={24} {...props} xmlns="http://www.w3.org/2000/svg">
      <use href={`${svg}#${iconName}`} />
    </svg>
  )
}