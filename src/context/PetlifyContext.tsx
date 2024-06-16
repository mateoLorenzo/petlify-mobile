import React, {useState} from 'react';
import {PropsWithChildren, createContext} from 'react';

interface PetlifyContextProps {
  isOpenServiceModal: boolean;
  petSelectedIndex: number | null;
  locationSelectedIndex: number | null;
  startDaySelected: string;
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
  setIsOpenServiceModal: (newValue: boolean) => void;
  setPetSelectedIndex: (newValue: number) => void;
  setLocationSelectedIndex: (newValue: number) => void;
  setStartDaySelected: (newValue: string) => void;
  setStartHour: (newValue: string) => void;
  setStartMinute: (newValue: string) => void;
  setEndHour: (newValue: string) => void;
  setEndMinute: (newValue: string) => void;
}

export const PetlifyContext = createContext({} as PetlifyContextProps);

export const AppContextProvider = ({children}: PropsWithChildren) => {
  const [isOpenServiceModal, setIsOpenServiceModal] = useState(false);
  const [petSelectedIndex, setPetSelectedIndex] = useState<number | null>(null);
  const [locationSelectedIndex, setLocationSelectedIndex] = useState<
    number | null
  >(null);
  const [startDaySelected, setStartDaySelected] = useState<string>('');
  const [startHour, setStartHour] = useState<string>('00');
  const [startMinute, setStartMinute] = useState<string>('00');
  const [endHour, setEndHour] = useState<string>('00');
  const [endMinute, setEndMinute] = useState<string>('00');

  const setModalIsOpen = (value: boolean) => setIsOpenServiceModal(value);
  const setPetIndex = (value: number) => setPetSelectedIndex(value);
  const setLocationIndex = (value: number) => setLocationSelectedIndex(value);
  const modifyStartDay = (value: string) => setStartDaySelected(value);
  const modifyStartHour = (value: string) => setStartHour(value);
  const modifyStartMinute = (value: string) => setStartMinute(value);
  const modifyEndHour = (value: string) => setEndHour(value);
  const modifyEndMinute = (value: string) => setEndMinute(value);

  return (
    <PetlifyContext.Provider
      value={{
        isOpenServiceModal,
        petSelectedIndex,
        locationSelectedIndex,
        startDaySelected,
        startHour,
        startMinute,
        endHour,
        endMinute,
        setIsOpenServiceModal: setModalIsOpen,
        setPetSelectedIndex: setPetIndex,
        setLocationSelectedIndex: setLocationIndex,
        setStartDaySelected: modifyStartDay,
        setStartHour: modifyStartHour,
        setStartMinute: modifyStartMinute,
        setEndHour: modifyEndHour,
        setEndMinute: modifyEndMinute,
      }}>
      {children}
    </PetlifyContext.Provider>
  );
};
