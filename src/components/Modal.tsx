import styled from 'styled-components';
import { useRef, MouseEvent } from 'react';
import { SvgIcon } from './SvgIcon';
import { useModalState } from '../apis/ModalContext';

interface ModalProps {
  $isopen: boolean;
  $type: "sucess" | "error";
  modalMessage: string;
}

const Modal = ({$isopen, $type, modalMessage}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { setModalData } = useModalState();
  
  const modalClose = (e: MouseEvent) => {
    if (e.target !== modalRef.current) 
      setModalData({
        modalOpen: false,
        modalType: "sucess",
        modalMsg: "",
      });
  }

  return (
    <ModalBase $isopen={$isopen} onClick={modalClose}>
      <ModalContentBase $type={$type} ref={modalRef}>
        {modalMessage}
        <ModalClose iconName='btn-close' fill='#ffffff' onClick={modalClose} />
      </ModalContentBase>
    </ModalBase>
  )
}

const ModalClose = styled(SvgIcon)`
  position: fixed;
  top: .8rem;
  right: .3rem;
  pointer-events: all;
  transform: rotate(45deg);
  &:hover {
    fill: #cccccc;
  }
`

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

const ModalContentBase = styled.div<{$type: "sucess" | "error"}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  word-break: break-all;
  width: 24rem;
  min-height: 4rem;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  color: #ffffff;
  background-color: ${({$type}) => $type === "sucess" ? '#10B310' : '#B31010'};
  z-index: 11;
`
export default Modal;