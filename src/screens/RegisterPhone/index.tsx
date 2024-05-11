import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Logo from '../../../assets/images/logo.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomTextInput} from '../../components/CustomTextInput';
import {useForm, useWatch} from 'react-hook-form';
import {CustomButton} from '../../components/CustomButton';
import CountdownTimer from '../../components/CountdownTimer';
import {phoneRegex} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {useAnimation} from '../../hooks/useAnimation';
import Icon from 'react-native-vector-icons/Ionicons';
const {width: screenWidth} = Dimensions.get('window');

const DismissKeyboard = ({children}: {children: React.ReactNode}) => (
  <TouchableOpacity
    activeOpacity={1}
    style={styles.container}
    onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableOpacity>
);

const RegisterPhoneScreen = () => {
  const {
    control,
    formState: {errors},
    trigger,
    resetField,
  } = useForm();
  const {
    contentPosition,
    leftContentOpacity,
    rightContentOpacity,
    moveContentLeft,
    moveContentRight,
    hideLeftContent,
    showRightContent,
    hideRightContent,
    showLeftContent,
  } = useAnimation();
  const [activeScreen, setActiveScreen] = useState<'phone' | 'code'>('phone');
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phoneIsValid, setPhoneIsValid] = useState(false);
  const phoneValue = useWatch({control, name: 'phone'});
  const phoneCodeValue = useWatch({control, name: 'phoneCode'});
  const {navigate} = useNavigation();
  const [checked, setChecked] = useState(false);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const onPressContinue = async () => {
    const output = await trigger('phone');
    if (output === true && checked) {
      setActiveScreen('code');
      moveContentLeft();
      hideLeftContent();
      showRightContent();
    }
    if (activeScreen === 'code' && phoneCodeValue?.length === 4) {
      navigate('RegisterPetScreen' as never);
    }
  };

  const onPressBack = () => {
    moveContentRight();
    hideRightContent();
    showLeftContent();
    setActiveScreen('phone');
    resetField('phoneCode');
  };

  const validatePhone = (phone: string) => {
    if (phoneRegex.test(phone)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const givenPhoneIsValid = validatePhone(phoneValue);
    if (givenPhoneIsValid) {
      setPhoneIsValid(true);
    } else {
      setPhoneIsValid(false);
    }
  }, [phoneValue]);

  const getButtonColor = (): '#1E96FF' | 'gray' => {
    if (activeScreen === 'phone' && phoneIsValid && checked) {
      return '#1E96FF';
    }
    // ToDo: Check if the code is valid
    if (activeScreen === 'code' && phoneCodeValue?.length === 4) {
      return '#1E96FF';
    }
    return 'gray';
  };

  const validateChangeField = () => {
    if (errors.phone) {
      trigger('phone');
    }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <DismissKeyboard>
          <Logo height={100} width={100} style={styles.logo} />
          <Animated.View
            style={{
              ...styles.mainContainer,
              transform: [{translateX: contentPosition}],
            }}>
            <View style={styles.widthFull}>
              <View style={styles.inputsContainer}>
                <Animated.View
                  style={{
                    ...styles.contentContainer,
                    opacity: leftContentOpacity,
                  }}>
                  <Text style={styles.title}>Ingresa tu Numero</Text>
                  <Text style={styles.subtitle}>
                    Te enviaremos un codigo de verificacion
                  </Text>
                  <CustomTextInput
                    name="phone"
                    control={control}
                    placeholder="Numero de telefono"
                    placeholderTextColor={'#8F8F8F'}
                    autoCorrect={false}
                    keyboardType="phone-pad"
                    style={styles.phoneInput}
                    validateChangeField={validateChangeField}
                    rules={{
                      required: 'Debes poner tu teléfono!',
                      pattern: {
                        value: phoneRegex,
                        message: 'Ingrese un telefono valido',
                      },
                    }}
                  />
                </Animated.View>
                <Animated.View
                  style={{
                    ...styles.contentContainer,
                    opacity: rightContentOpacity,
                  }}>
                  <Text style={styles.title}>Ingresa el codigo</Text>
                  <Text style={styles.subtitle}>
                    Te lo hemos enviado a +54 9 {phoneValue}
                  </Text>
                  <CustomTextInput
                    name="phoneCode"
                    control={control}
                    placeholder=""
                    placeholderTextColor={'#8F8F8F'}
                    keyboardType="phone-pad"
                    style={styles.phoneCodeInput}
                  />

                  <Animated.View style={styles.countdownContainer}>
                    <CountdownTimer startTimer={activeScreen === 'code'} />
                  </Animated.View>
                </Animated.View>
              </View>
            </View>
            <View style={styles.spacer} />
            <TouchableOpacity
              style={styles.termsButton}
              activeOpacity={0.5}
              onPress={toggleChecked}>
              <View style={styles.checkboxContainer}>
                <View
                  style={
                    checked
                      ? styles.checkedContainer
                      : styles.uncheckedContainer
                  }>
                  {checked ? (
                    <Icon name="checkmark-sharp" size={15} color="#FFF" />
                  ) : null}
                </View>
              </View>
              <Text style={styles.termsText}>
                He leido y acepto los Terminos y Condiciones
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <CustomButton
            label="Continuar"
            style={{
              ...styles.continueButton,
              backgroundColor: getButtonColor(),
            }}
            // loading={isLoading}
            onPress={onPressContinue}
            labelStyle={styles.buttonTextStyles}
          />
          <TouchableOpacity onPress={onPressBack}>
            <Text style={styles.goBackText}>Volver</Text>
          </TouchableOpacity>
        </DismissKeyboard>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    marginTop: 40,
  },
  title: {
    fontSize: 26,
    marginTop: 20,
    fontFamily: 'Poppins-Semibold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: '100',
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  mainContainer: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
  widthFull: {
    width: '100%',
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth * 2 - 40,
  },
  contentContainer: {
    alignItems: 'center',
  },
  phoneInput: {
    marginTop: 20,
    borderColor: '#8F8F8F',
    width: screenWidth - 40,
    alignSelf: 'flex-start',
  },
  phoneCodeInput: {
    marginTop: 20,
    borderColor: '#8F8F8F',
    width: screenWidth - 40,
    letterSpacing: 40,
  },
  countdownContainer: {
    opacity: 1,
    width: '100%',
  },
  spacer: {
    flex: 1,
  },
  termsButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkedContainer: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1E96FF',
    backgroundColor: '#1E96FF',
  },
  uncheckedContainer: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#A8A8A8',
    backgroundColor: 'transparent',
  },
  continueButton: {
    marginTop: 20,
    height: 60,
    width: '100%',
    backgroundColor: 'gray',
  },
  termsText: {
    marginLeft: 10,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  buttonTextStyles: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  goBackText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
});

export default RegisterPhoneScreen;
