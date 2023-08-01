import { Dispatch, SetStateAction, createContext, useState, ReactNode, useContext } from 'react'
import { TodoProvider } from './TodoContext'

interface ModalDataProps {
  modalOpen: boolean;
  modalType: "sucess" | "error";
  modalMsg: string;
}

interface ModalContextProps {
  modalData: ModalDataProps;
  setModalData: Dispatch<SetStateAction<ModalDataProps>>;
}
const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({children}: {children: ReactNode}) => {
  const [modalData, setModalData] = useState<ModalDataProps>({
    modalOpen: false,
    modalType: "sucess",
    modalMsg: "",
  })
  
  return (
    <ModalContext.Provider value={{modalData, setModalData}}>
      <TodoProvider>
        {children}
      </TodoProvider>
    </ModalContext.Provider>
  )
}

export const useModalState = () => {
  const modalState = useContext(ModalContext);
  if (!modalState)
    throw new Error('Cannot find modalProvider');
  const modalOpen = modalState.modalData.modalOpen;
  const modalType = modalState.modalData.modalType;
  const modalMsg = modalState.modalData.modalMsg;
  const setModalData = modalState.setModalData;
  
  return {modalOpen, modalType, modalMsg, setModalData};
}