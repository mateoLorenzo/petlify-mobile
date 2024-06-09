import {useState} from 'react';
import {useForm, useWatch} from 'react-hook-form';
import {
  RegisterFormData,
  RegisterFormFields,
  fieldValueIsValid,
  fieldsColors,
  validateConfirmPassword,
} from '../constants';

export const useRegisterForm = (formFields: string[]) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    trigger,
    reset,
  } = useForm<RegisterFormData>();

  const errorsFromPass = errors.password?.message?.split('.');
  const errorMessagesToShow = errorsFromPass?.filter(error => error !== '');
  const [greenFields, setGreenFields] = useState<string[]>([]);
  const [redFields, setRedFields] = useState<string[]>([]);
  const [grayFields, setGrayFields] = useState<string[]>(formFields);

  const currentPassword = useWatch({control, name: 'password'});

  const updateValidFields = (fieldName: RegisterFormFields) => {
    setGreenFields([...greenFields, fieldName]);
    setRedFields(redFields.filter(field => field !== fieldName));
    setGrayFields(grayFields.filter(field => field !== fieldName));
  };

  const updateInvalidFields = (fieldName: RegisterFormFields) => {
    setRedFields([...redFields, fieldName]);
    setGreenFields(greenFields.filter(field => field !== fieldName));
    setGrayFields(grayFields.filter(field => field !== fieldName));
  };

  const updateGrayFields = (fieldName: RegisterFormFields) => {
    setGrayFields([...grayFields, fieldName]);
    setRedFields(redFields.filter(field => field !== fieldName));
    setGreenFields(greenFields.filter(field => field !== fieldName));
  };

  const resetFields = () => {
    setGreenFields([]);
    setRedFields([]);
    setGrayFields(formFields);
  };

  const validateBlurPassword = (field: string, value: string) => {
    const confirmPasswordIsValid = validateConfirmPassword(
      currentPassword,
      value,
    );
    if (confirmPasswordIsValid === true) {
      updateValidFields('confirmPassword');
    } else {
      updateInvalidFields('confirmPassword');
    }
  };

  const validateChangePassword = (field: string, value: string) => {
    const confirmPasswordIsValid = validateConfirmPassword(
      currentPassword,
      value,
    );
    if (confirmPasswordIsValid === true) {
      updateValidFields('confirmPassword');
    } else {
      updateGrayFields('confirmPassword');
    }
  };

  const validateBlurField = (
    fieldName: RegisterFormFields,
    value: string = '',
  ) => {
    const fieldIsValid = fieldValueIsValid(fieldName, value);
    if (fieldIsValid) {
      updateValidFields(fieldName);
    } else {
      updateInvalidFields(fieldName);
    }
  };

  const validateChangeField = (
    fieldName: RegisterFormFields,
    value: string = '',
  ) => {
    const fieldIsValid = fieldValueIsValid(fieldName, value);
    if (fieldIsValid) {
      updateValidFields(fieldName);
    } else {
      updateGrayFields(fieldName);
    }
  };

  const getFieldColor = (fieldName: RegisterFormFields): fieldsColors => {
    if (greenFields.includes(fieldName)) {
      return 'green';
    }
    if (redFields.includes(fieldName)) {
      return 'red';
    }
    return 'gray';
  };

  return {
    control,
    errors,
    errorMessagesToShow,
    currentPassword,
    handleSubmit,
    validateBlurPassword,
    validateChangePassword,
    validateBlurField,
    validateChangeField,
    getFieldColor,
    trigger,
    reset,
    resetFields,
  };
};
