import styled from 'styled-components';
import { useRef, MouseEvent } from 'react';
import { SvgIcon } from './SvgIcon';
import { useModalState } from '../hooks/useModalState';

const Modal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { modalOpen, modalType, modalMsg, setModalData } = useModalState();
  const modalClose = (e: MouseEvent) => {
    if (e.target !== modalRef.current)
      setModalData({ modalOpen: false, modalType: 'detail', modalMsg: '' });
  };

  return (
    <ModalBase $isopen={modalOpen} onClick={modalClose}>
      <ModalContentBase $type={modalType} ref={modalRef}>
        <p>{modalMsg}</p>
        <ModalClose iconName='btn-close' $direction='down' $type={modalType} onClick={modalClose} />
      </ModalContentBase>
    </ModalBase>
  );
};

export default Modal;

const ModalClose = styled(SvgIcon)<{ $type: 'detail' | 'error' }>`
  position: fixed;
  top: 0.8rem;
  right: 0.3rem;
  pointer-events: all;
  fill: ${({ $type }) => ($type === 'error' ? '#ffffff' : '#000000')};
  transform: rotate(45deg);
  &:hover {
    fill: ${({ $type }) => ($type === 'error' ? '#cccccc' : '#555555')};
  }
`;

const ModalBase = styled.div<{ $isopen: boolean }>`
  display: ${({ $isopen }) => $isopen === false && 'none'};
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000033;
  z-index: 10;
`;

const ModalContentBase = styled.div<{ $type: 'detail' | 'error' }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24rem;
  min-height: 4rem;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  background-color: ${({ $type }) => ($type === 'error' ? '#B31010' : '#e5e7eb')};
  z-index: 11;
  & > p {
    line-height: 1.6rem;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-size: 1.2rem;
    color: ${({ $type }) => ($type === 'error' ? '#ffffff' : '#000000')};
  }
`;
