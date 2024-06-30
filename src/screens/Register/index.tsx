import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
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
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const formFields = ['name', 'lastName', 'email', 'password', 'confirmPassword'];
type screenTypes = 'register' | 'login';

const {width} = Dimensions.get('window');

const DismissKeyboard = ({children}: {children: React.ReactNode}) => (
  <TouchableOpacity
    activeOpacity={1}
    style={styles.container}
    onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableOpacity>
);

const RegisterScreen = () => {
  const {top} = useSafeAreaInsets();

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
    trigger,
    reset,
    resetFields,
  } = useRegisterForm(formFields);

  const [currentScreen, setCurrentScreen] = useState<screenTypes>('register');
  const registerSectionPosition = useRef(new Animated.Value(0)).current;
  const loginSectionPosition = useRef(new Animated.Value(width)).current;
  const registerSectionOpacity = useRef(new Animated.Value(1)).current;
  const loginSectionOpacity = useRef(new Animated.Value(0)).current;

  const changeAuthSection = () => {
    Animated.timing(registerSectionPosition, {
      toValue: currentScreen === 'register' ? -width : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(loginSectionPosition, {
      toValue: currentScreen === 'login' ? width : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(registerSectionOpacity, {
      toValue: currentScreen === 'register' ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(loginSectionOpacity, {
      toValue: currentScreen === 'login' ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const navigation = useNavigation();

  const onPressRegister = () => {
    navigation.navigate('RegisterPhoneScreen' as never);
  };
  const onPressLogin = () => {
    navigation.navigate('HomeScreen' as never);
  };

  const validateRegisterFields = async () => {
    const result = await trigger([
      'name',
      'lastName',
      'email',
      'password',
      'confirmPassword',
    ]);
    if (result) {
      handleSubmit(onPressRegister)();
    }
  };
  const validateLoginFields = async () => {
    const result = await trigger(['email', 'password']);

    if (result) {
      onPressLogin();
    } else {
      handleSubmit(onPressLogin)();
    }
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

  const emailIsValid = (email: string) => {
    const isValid = emailRegex.test(email);
    if (!isValid) {
      return 'El email no es válido';
    }
  };

  const onAuthPress = () => {
    changeAuthSection();
    reset();
    resetFields();
    if (currentScreen === 'register') {
      setCurrentScreen('login');
    } else {
      setCurrentScreen('register');
    }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.contentContainer}
        keyboardVerticalOffset={10}>
        <DismissKeyboard>
          <View
            style={{
              ...styles.titleContainer,
              marginTop: Platform.OS === 'ios' ? top + 10 : top + 40,
            }}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={25} color="#000" />
            </TouchableOpacity>
            <Animated.Text
              style={{...styles.title, opacity: registerSectionOpacity}}>
              Registrar Cuenta
            </Animated.Text>
            <Animated.Text
              style={{...styles.title, opacity: loginSectionOpacity}}>
              Iniciar Sesion
            </Animated.Text>
          </View>

          <View style={styles.sectionsContainer}>
            <Animated.View
              style={{
                ...styles.inputsContainer,
                transform: [{translateX: registerSectionPosition}],
              }}>
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
            </Animated.View>

            <Animated.View
              style={{
                ...styles.inputsContainer,
                transform: [{translateX: loginSectionPosition}],
              }}>
              <CustomTextInput
                name="email"
                control={control}
                placeholderTextColor={'#8F8F8F'}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                rules={{
                  required: 'Debes poner tu correo!',
                  validate: emailIsValid,
                }}
              />
              <CustomTextInput
                name="password"
                control={control}
                placeholderTextColor={'#8F8F8F'}
                placeholder="Password"
                autoCapitalize="none"
                isPasswordField
                containerStyle={styles.passwordInput}
                rules={{required: 'Debes poner tu contraseña!'}}
              />
              <TouchableOpacity activeOpacity={0.5}>
                <Text style={styles.forgotPasswordText}>
                  Olvidé mi contraseña
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
          <View style={styles.spacer} />
          <CustomButton
            label={
              currentScreen === 'register' ? 'Registrarme' : 'Iniciar Sesion'
            }
            style={styles.registerButton}
            onPress={
              currentScreen === 'register'
                ? validateRegisterFields
                : validateLoginFields
            }
          />
        </DismissKeyboard>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.registerTextContainer}
        activeOpacity={0.5}
        onPress={onAuthPress}>
        {currentScreen === 'register' ? (
          <>
            <Text style={styles.registerTextLeft}>¿Ya tienes una cuenta?</Text>
            <Text style={styles.registerTextRight}>Inicia sesion</Text>
          </>
        ) : (
          <>
            <Text style={styles.registerTextLeft}>
              ¿Aún no tienes una cuenta?
            </Text>
            <Text style={styles.registerTextRight}>Únete ahora</Text>
          </>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    width: '100%',
  },
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    // marginTop: 30,
    backgroundColor: 'red',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 25,
    marginLeft: 40,
    position: 'absolute',
  },
  sectionsContainer: {
    alignItems: 'center',
  },
  inputsContainer: {
    width: '100%',
    marginTop: 20,
    position: 'absolute',
  },
  passwordInput: {
    marginTop: 10,
  },
  forgotPasswordText: {
    textAlign: 'right',
    fontFamily: 'Poppins-Medium',
    color: '#1976D2',
    fontSize: 15,
    marginTop: 10,
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
  marginTop10: {
    marginTop: 10,
  },
  marginLeft: {
    marginLeft: 10,
  },
  spacer: {
    flex: 1,
  },
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
