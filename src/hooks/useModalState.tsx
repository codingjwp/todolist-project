import { useContext } from 'react';
import { ModalContext } from '../apis/ModalContext';

export const useModalState = () => {
  const modalState = useContext(ModalContext);
  if (!modalState) throw new Error('Cannot find modalProvider');
  const modalOpen = modalState.modalData.modalOpen;
  const modalType = modalState.modalData.modalType;
  const modalMsg = modalState.modalData.modalMsg;
  const setModalData = modalState.setModalData;

  return { modalOpen, modalType, modalMsg, setModalData };
};
