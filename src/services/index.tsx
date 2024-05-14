import {months as abbreviatedMonths, weekdays} from '../constants';

export const getScheduleDateInfo = (
  date: Date,
): {
  dayOfWeek: string;
  formattedDate: string;
} => {
  const dayOfWeek: string = weekdays[date.getDay()];
  const dayOfMonth: number = date.getDate();
  const monthIndex: number = date.getMonth();
  const month: string = abbreviatedMonths[monthIndex];
  const year: number = date.getFullYear();

  const formattedDate: string = `${dayOfMonth} ${month}, ${year}`;

  return {dayOfWeek, formattedDate};
};
