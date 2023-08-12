import { Dispatch, SetStateAction, createContext, useState, ReactNode } from 'react'

interface ModalDataProps {
  modalOpen: boolean;
  modalType: "detail" | "error";
  modalMsg: string;
}

interface ModalContextProps {
  modalData: ModalDataProps;
  setModalData: Dispatch<SetStateAction<ModalDataProps>>;
}

export const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({children}: {children: ReactNode}) => {
  const [modalData, setModalData] = useState<ModalDataProps>({
    modalOpen: false,
    modalType: "detail",
    modalMsg: "",
  })
  
  return (
    <ModalContext.Provider value={{modalData, setModalData}}>
        {children}
    </ModalContext.Provider>
  )
}