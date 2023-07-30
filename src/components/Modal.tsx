import styled, {css} from 'styled-components';
import { useRef, MouseEvent, useState } from 'react';

interface ModalProps {
  $isopen: boolean;
  $type: "sucess" | "error";
  modalMessage: string;
}

const Modal = ({$isopen, $type, modalMessage}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isClose, setIsClose] = useState(true);
  const modalClose = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target !== modalRef.current) setIsClose((prev) => !prev);
  }

  return (
    <ModalBase $isopen={$isopen && isClose} onClick={modalClose}>
      <ModalContextBase $type={$type} ref={modalRef}>
        {modalMessage}
      </ModalContextBase>
    </ModalBase>
  )
}

const modalType = {
  "sucess": css`
    background-color: #10B310;
  `,
  "error": css`
    background-color: #B31010;
  `
}

const ModalBase = styled.div<{$isopen: boolean}>`
  display: ${({$isopen}) => $isopen === false && 'none'};
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000033;
  z-index: 10;
`

const ModalContextBase = styled.div<{$type: "sucess" | "error"}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24rem;
  padding: 2rem 2rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  color: #ffffff;
  ${({$type}) => modalType[$type]};
  z-index: 11;
`
export default Modal;