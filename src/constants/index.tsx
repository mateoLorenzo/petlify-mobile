export type RegisterFormData = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  phoneCode: string;
};

export type ChangePassword = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

export type RegisterFormFields = keyof RegisterFormData | keyof ChangePassword; // 'name' | 'lastName' | 'email' | 'password' | 'phone'
export type fieldsColors = 'green' | 'gray' | 'red';
export type grayOrBlue = '#9B9B9B' | '#1E96FF'; // 'gray' | 'blue'

export const nameRegex = /^\s*[A-Za-z]{2,}\s*$/;
export const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
export const hasUpperCase = (str: string) => /[A-Z]/.test(str);
export const hasNumber = (str: string) => /[0-9]/.test(str);
export const hasSixDigits = (str: string) => str.length >= 6;
export const isEmpty = (str: string) => str.trim().length === 0;
export const phoneRegex = /^(?=(?:\D*\d){10}$)(?:\d{2}\s?\d{4}\s?-?\s?\d{4})$/;
export const numberRegex = /^[0-9]+$/;

export const validatePassword = (value: string) => {
  let errorMessages = '';
  if (isEmpty(value)) {
    return (errorMessages += 'La contraseña no puede estar vacía.');
  }
  if (!hasSixDigits(value)) {
    errorMessages += 'Debe tener al menos 6 caracteres.';
  }
  if (!hasNumber(value)) {
    errorMessages += 'Debe contener al menos un número.';
  }
  if (!hasUpperCase(value)) {
    errorMessages += 'Debe contener al menos una mayúscula.';
  }
  if (errorMessages) {
    return errorMessages;
  }
  return true;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
) => {
  if (password !== confirmPassword) {
    return 'Las contraseñas no coinciden.';
  }
  return true;
};

export const fieldValueIsValid = (
  fieldName: RegisterFormFields,
  value: string,
) => {
  if (fieldName === 'name') {
    return nameRegex.test(value);
  }
  if (fieldName === 'lastName') {
    return nameRegex.test(value);
  }
  if (fieldName === 'email') {
    return emailRegex.test(value);
  }
  if (fieldName === 'password') {
    return validatePassword(value) === true;
  }
};

export const dogBreeds = [
  'Otra...',
  'Bulldog',
  'Bull Terrier',
  'Cairn Terrier',
  'Chihuahua',
  'Dachshund',
  'Dalmatian',
  'Doberman',
  'German',
  'Golden Retriever',
  'Great Dane',
  'Greyhound',
  'Husky',
  'Labrador',
  'Mastiff',
  'Pitbull',
  'Poodle',
  'Pug',
  'Rottweiler',
  'Schnauzer',
  'Shih Tzu',
];

export const weekdays: string[] = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

export const months: string[] = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
];
