import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomTextInput} from '../../components/CustomTextInput';
import {
  emailRegex,
  nameRegex,
  validateConfirmPassword,
  validatePassword,
} from '../../constants';
import {useRegisterForm} from '../../hooks/useFormValidations';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomButton} from '../../components/CustomButton';

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
          <View style={styles.titleContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={25} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Registrar Cuenta</Text>
          </View>

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

          <CustomButton
            label="Registrarme"
            style={styles.registerButton}
            onPress={handleSubmit(onPressRegister)}
          />

          <TouchableOpacity
            style={styles.registerTextContainer}
            activeOpacity={1.8}
            onPress={() => navigation.navigate('loginScreen' as never)}>
            <Text style={styles.registerTextLeft}>¿Ya tienes una cuenta?</Text>
            <Text style={styles.registerTextRight}> Inicia sesion ahora</Text>
          </TouchableOpacity>
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
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 25,
  },
  inputsContainer: {
    width: '100%',
    marginTop: 20,
  },
  registerButton: {
    height: 55,
    marginTop: 20,
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
  registerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
  registerTextLeft: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: '#8F8F8F',
    fontSize: 15,
    marginRight: 5,
  },
  registerTextRight: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    color: '#1976D2',
    fontSize: 15,
  },
});

export default RegisterScreen;

export const errors = {
  message: 'Debes poner tu contraseña!',
  ref: {name: 'password'},
  type: 'required',
};
