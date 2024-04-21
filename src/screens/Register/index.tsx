import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {AuthHeader} from '../../components/AuthHeader';
import {AuthFooter} from '../../components/AuthFooter';
import {useForm, useWatch} from 'react-hook-form';
import {CustomTextInput} from '../../components/CustomTextInput';
import {useNavigation} from '@react-navigation/native';
import {
  RegisterFormData,
  RegisterFormFields,
  emailRegex,
  fieldValueIsValid,
  fieldsColors,
  nameRegex,
  validateConfirmPassword,
  validatePassword,
} from '../../constants';

const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterFormData>();

  const {navigate} = useNavigation();
  const errorsFromPass = errors.password?.message?.split('.');
  const errorMessagesToShow = errorsFromPass?.filter(error => error !== '');
  const [greenFields, setGreenFields] = useState<string[]>([]);
  const [redFields, setRedFields] = useState<string[]>([]);
  const [grayFields, setGrayFields] = useState<string[]>([
    'name',
    'lastName',
    'email',
    'password',
    'phone',
  ]);

  const currentPassword = useWatch({control, name: 'password'});

  const onPressRegister = () => {
    navigate('RegisterPetScreen' as never);
  };

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

  const renderErrorMessages = () => {
    return (
      <>
        {errorMessagesToShow?.map((error, index) => (
          <Text key={`${index}-${error}`} style={styles.errorMessage}>
            {error}
          </Text>
        ))}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView
          bounces={false}
          style={styles.contentContainer}
          contentContainerStyle={styles.contentContainerStyle}>
          <AuthHeader divisorText="Registrarme" />

          <View style={styles.inputsContainer}>
            <View style={styles.nameInputContainer}>
              <View style={styles.flex1}>
                <CustomTextInput
                  name="name"
                  control={control}
                  autoCorrect={false}
                  placeholder="Tu Nombre"
                  style={styles.nameInput}
                  placeholderTextColor={'#8F8F8F'}
                  validateBlurField={validateBlurField}
                  validateChangeField={validateChangeField}
                  fieldColor={getFieldColor('name')}
                  rules={{
                    required: 'Ingrese su nombre',
                    pattern: {
                      value: nameRegex,
                      message: 'Ingrese un nombre valido',
                    },
                  }}
                  autoCapitalize={'words'}
                />
              </View>
              <View style={styles.flex1}>
                <CustomTextInput
                  name="lastName"
                  control={control}
                  autoCorrect={false}
                  placeholder="Apellido"
                  validateBlurField={validateBlurField}
                  validateChangeField={validateChangeField}
                  fieldColor={getFieldColor('lastName')}
                  placeholderTextColor={'#8F8F8F'}
                  rules={{
                    required: 'Ingrese su apellido',
                    pattern: {
                      value: nameRegex,
                      message: 'Ingrese un apellido valido',
                    },
                  }}
                  style={{...styles.nameInput}}
                  mainContainerStyle={{...styles.marginLeft}}
                  autoCapitalize={'words'}
                />
              </View>
            </View>

            <CustomTextInput
              name="email"
              control={control}
              placeholder="Email"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor={'#8F8F8F'}
              validateBlurField={validateBlurField}
              validateChangeField={validateChangeField}
              fieldColor={getFieldColor('email')}
              rules={{
                required: 'Ingrese su correo',
                pattern: {
                  value: emailRegex,
                  message: 'Correo invalido',
                },
              }}
            />

            <CustomTextInput
              name="password"
              isPasswordField
              control={control}
              autoCapitalize="none"
              placeholder="Contraseña"
              placeholderTextColor={'#8F8F8F'}
              validateBlurField={validateBlurField}
              validateChangeField={validateChangeField}
              fieldColor={getFieldColor('password')}
              rules={{
                required: 'Ingrese su contraseña',
                validate: validatePassword,
              }}
              containerStyle={styles.marginTop10}
              errorMessages={() => renderErrorMessages()}
            />

            <CustomTextInput
              name="confirmPassword"
              isPasswordField
              control={control}
              autoCapitalize="none"
              placeholder="Confirmar contraseña"
              placeholderTextColor={'#8F8F8F'}
              validateBlurField={validateBlurPassword}
              validateChangeField={validateChangePassword}
              fieldColor={getFieldColor('confirmPassword')}
              rules={{
                required: 'Ingrese su contraseña',
                validate: value =>
                  validateConfirmPassword(currentPassword, value),
              }}
              containerStyle={styles.marginTop10}
            />
          </View>

          <AuthFooter
            authType="register"
            onAuthPress={handleSubmit(onPressRegister)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
  },
  inputsContainer: {
    width: '100%',
  },
  nameInputContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  nameInput: {
    flex: 1,
    height: 55,
    borderWidth: 1,
    borderColor: '#8F8F8F',
    borderRadius: 3,
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Regular',
  },
  flex1: {flex: 1},
  marginTop10: {marginTop: 10},
  marginLeft: {marginLeft: 10},
  errorMessage: {
    color: 'red',
    fontSize: 13,
  },
});

export default RegisterScreen;

export const errors = {
  message: 'Debes poner tu contraseña!',
  ref: {name: 'password'},
  type: 'required',
};
