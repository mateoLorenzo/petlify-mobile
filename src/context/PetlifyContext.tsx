import React, {useState} from 'react';
import {PropsWithChildren, createContext} from 'react';

interface PetlifyContextProps {
  isOpenServiceModal: boolean;
  setIsOpenServiceModal: (newValue: boolean) => void;
}

export const PetlifyContext = createContext({} as PetlifyContextProps);

export const AppContextProvider = ({children}: PropsWithChildren) => {
  const [isOpenServiceModal, setIsOpenServiceModal] = useState(false);

  const setModalIsOpen = (value: boolean) => {
    setIsOpenServiceModal(value);
  };
  return (
    <PetlifyContext.Provider
      value={{
        isOpenServiceModal,
        setIsOpenServiceModal: setModalIsOpen,
      }}>
      {children}
    </PetlifyContext.Provider>
  );
};
