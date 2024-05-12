import React from 'react';
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
import {CustomTextInput} from '../../components/CustomTextInput';
import {
  emailRegex,
  nameRegex,
  validateConfirmPassword,
  validatePassword,
} from '../../constants';
import {useRegisterForm} from '../../hooks/useFormValidations';
import {useNavigation} from '@react-navigation/native';

const formFields = ['name', 'lastName', 'email', 'password', 'confirmPassword'];

const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    validateBlurField,
    validateChangeField,
    validateBlurPassword,
    validateChangePassword,
    getFieldColor,
    errorMessagesToShow,
    currentPassword,
  } = useRegisterForm(formFields);

  const navigation = useNavigation();

  const onPressRegister = () => {
    navigation.navigate('RegisterPhoneScreen' as never);
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
    borderRadius: 3,
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Regular',
  },
  flex1: {flex: 1},
  marginTop10: {marginTop: 10},
  marginLeft: {marginLeft: 10},
  errorMessage: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});

export default RegisterScreen;

export const errors = {
  message: 'Debes poner tu contraseña!',
  ref: {name: 'password'},
  type: 'required',
};
