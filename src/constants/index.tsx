export type RegisterFormData = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
};

export type RegisterFormFields = keyof RegisterFormData; // 'name' | 'lastName' | 'email' | 'password' | 'phone'

export const nameRegex = /^\s*[A-Za-z]{2,}\s*$/;
export const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
export const hasUpperCase = (str: string) => /[A-Z]/.test(str);
export const hasNumber = (str: string) => /[0-9]/.test(str);
export const hasSixDigits = (str: string) => str.length >= 6;
export const isEmpty = (str: string) => str.trim().length === 0;
export const phoneRegex = /^(?=(?:\D*\d){10}$)(?:\d{2}\s?\d{4}\s?-?\s?\d{4})$/;

export type fieldsColors = 'green' | 'gray' | 'red';
