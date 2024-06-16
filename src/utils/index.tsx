import {CommonActions, NavigationProp} from '@react-navigation/native';

export const navigateAndReset = (
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'>,
  screenName: string,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: screenName}],
    }),
  );
};

export const getCompleteDate = (date: string, hour: string, minute: string) => {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day, parseInt(hour), parseInt(minute));
};

export const getDateValues = (date: Date) => {
  const extractedYear = date.getFullYear();
  const extractedMonth = date.getMonth() + 1; // Add 1 because months in JS are 0-11
  const extractedDay = date.getDate();
  const extractedHour = date.getHours();
  const extractedMinute = date.getMinutes();

  return {
    extractedYear,
    extractedMonth,
    extractedDay,
    extractedHour,
    extractedMinute,
  };
};

export const formatDateTimeString = (startDate: Date, endDate: Date) => {
  const daysOfWeek = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  const startValues = getDateValues(startDate);
  const endValues = getDateValues(endDate);

  const dayOfWeek = daysOfWeek[startDate.getDay()];
  const formattedStartHour = String(startValues.extractedHour).padStart(2, '0');
  const formattedStartMinute = String(startValues.extractedMinute).padStart(
    2,
    '0',
  );
  const formattedEndHour = String(endValues.extractedHour).padStart(2, '0');
  const formattedEndMinute = String(endValues.extractedMinute).padStart(2, '0');

  const formattedDate = `${dayOfWeek} ${String(
    startValues.extractedDay,
  ).padStart(2, '0')}/${String(startValues.extractedMonth).padStart(
    2,
    '0',
  )} - ${formattedStartHour}:${formattedStartMinute}hs a ${formattedEndHour}:${formattedEndMinute}hs`;

  return formattedDate;
};
