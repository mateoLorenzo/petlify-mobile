/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: Remove line
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Logo from '../../../assets/images/logo.svg';
import {CustomTextInput} from '../../components/CustomTextInput';
import {useForm, useWatch} from 'react-hook-form';
import {CustomButton} from '../../components/CustomButton';
import {OTPInput} from '../../components/OneTimePassCode';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import CountdownTimer from '../../components/CountdownTimer';
import {grayOrBlue, phoneRegex} from '../../constants';

// get screen width
const {width: screenWidth} = Dimensions.get('window');

const RegisterPhoneScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [phoneInputValue, setPhoneInputValue] = useState<string[]>([]);
  const [resendTextColor, setResendTextColor] = useState<grayOrBlue>('#9B9B9B');
  const [phoneIsValid, setPhoneIsValid] = useState<boolean>(false);
  const phoneValue = useWatch({control, name: 'phone'});
  const inputPosition = useRef(new Animated.Value(0)).current;
  const confirmPosition = useRef(new Animated.Value(screenWidth)).current;
  const backButtonPosition = useRef(new Animated.Value(-10)).current;
  const confirmButtonWidth = useRef(
    new Animated.Value(screenWidth - 40),
  ).current;
  const firstItemsOpacity = useRef(new Animated.Value(1)).current;
  const secondItemsOpacity = useRef(new Animated.Value(0)).current;

  const {navigate} = useNavigation();

  console.log('phoneValue', phoneValue);

  const moveInputLeft = (duration: number = 500) => {
    Animated.timing(inputPosition, {
      toValue: -screenWidth,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const moveInputRight = () => {
    Animated.timing(inputPosition, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const moveConfirmLeft = (duration: number = 500) => {
    Animated.timing(confirmPosition, {
      toValue: -(screenWidth - 40),
      duration,
      useNativeDriver: true,
    }).start();
  };

  const moveConfirmRight = () => {
    Animated.timing(confirmPosition, {
      toValue: 100,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const reduceContinueButtonWidth = (duration: number = 500) => {
    Animated.timing(confirmButtonWidth, {
      toValue: screenWidth - 110,
      // toValue: 100,
      duration,
      useNativeDriver: false,
    }).start();
  };
  const expandContinueButtonWidth = (duration: number = 500) => {
    Animated.timing(confirmButtonWidth, {
      toValue: screenWidth - 40,
      duration,
      useNativeDriver: false,
    }).start();
  };

  const showBackButton = (duration: number = 500) => {
    Animated.timing(backButtonPosition, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const hideBackButton = (duration: number = 500) => {
    Animated.timing(backButtonPosition, {
      toValue: -10,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeInSecondItems = (duration: number = 500) => {
    Animated.timing(secondItemsOpacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOutSecondItems = (duration: number = 500) => {
    Animated.timing(secondItemsOpacity, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeInFirstItems = (duration: number = 500) => {
    Animated.timing(firstItemsOpacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOutFirstItems = (duration: number = 500) => {
    Animated.timing(firstItemsOpacity, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const handleChange = (value: Array<string>) => {
    console.log('value from handleChange', value);
    setPhoneInputValue(value);
  };

  const onSubmit = () => {
    setPhoneIsValid(true);
    moveInputLeft();
    moveConfirmLeft();
    reduceContinueButtonWidth();
    showBackButton();
    fadeInSecondItems();
    fadeOutFirstItems();
    // setIsLoading(true);
    console.log('errors', errors);
  };

  const goBack = () => {
    setPhoneIsValid(false);
    moveInputRight();
    moveConfirmRight();
    expandContinueButtonWidth();
    hideBackButton();
    fadeOutSecondItems();
    fadeInFirstItems();
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar />
      <TouchableOpacity onPress={() => {}}>
        <Logo height={150} width={150} style={styles.logo} />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>Bienvenido!</Text>

        <View style={styles.inputsContainer}>
          <Animated.View
            style={{
              ...styles.phoneInputContainer,
              transform: [{translateX: inputPosition}],
              opacity: firstItemsOpacity,
            }}>
            <Text style={styles.subtitle}>
              Ingresa tu telefono para comenzar
            </Text>
            <CustomTextInput
              name="phone"
              control={control}
              placeholderTextColor={'#8F8F8F'}
              placeholder="Teléfono"
              autoCapitalize="none"
              keyboardType="phone-pad"
              autoCorrect={false}
              style={styles.phoneInput}
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
              transform: [{translateX: confirmPosition}],
              ...styles.OTPInputContainer,
            }}>
            <View>
              <Text style={styles.subtitle}>
                Ingresa el codigo que enviamos a:
              </Text>
              <Text style={styles.givenPhone}>+54 9 {phoneValue}</Text>
            </View>
            <OTPInput
              length={6}
              value={phoneInputValue}
              disabled={false}
              onChange={handleChange}
            />
          </Animated.View>
        </View>
        <View style={styles.buttonsContainer}>
          <Animated.View
            style={{
              transform: [{translateX: backButtonPosition}],
              opacity: secondItemsOpacity,
            }}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.8}
              onPress={goBack}>
              <Icon size={25} color="#FFF" name={'chevron-back-outline'} />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{width: confirmButtonWidth}}>
            <CustomButton
              label="Continuar"
              onPress={handleSubmit(onSubmit)}
              // onPress={onSubmit}
              loading={isLoading}
              containerStyle={styles.confirmContainer}
              style={styles.confirmButton}
              labelStyle={styles.confirmButtonLabel}
            />
          </Animated.View>
        </View>

        <Animated.View style={{opacity: secondItemsOpacity}}>
          <CountdownTimer startTimer={phoneIsValid} />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logo: {
    marginTop: 20,
    alignSelf: 'center',
  },
  welcomeText: {
    fontSize: 36,
    marginTop: 20,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  phoneInputContainer: {
    justifyContent: 'space-between',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#8B8B8B',
  },
  inputsContainer: {
    flexDirection: 'row',
  },
  phoneInput: {
    width: '100%',
    marginTop: 20,
  },
  givenPhone: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#1E96FF',
    marginBottom: 5,
  },
  OTPInputContainer: {
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
  },
  backButton: {
    width: 60,
    height: 60,
    backgroundColor: '#1E96FF',
    marginRight: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmContainer: {
    // flex: 1,
    // width: '100%',
    // width: 350,
    alignSelf: 'flex-end',
  },
  confirmButton: {
    // marginTop: 20,
    height: 60,
  },
  confirmButtonLabel: {
    fontSize: 18,
  },
  resendCodeContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  resendCodeText: {
    fontFamily: 'Poppins-Medium',
  },
  resendCodeTimer: {
    color: '#1E96FF',
    fontFamily: 'Poppins-Medium',
  },
  countdownText: {
    color: '#1E96FF',
    fontFamily: 'Poppins-Medium',
    marginLeft: 5,
    fontSize: 16,
  },
});

export default RegisterPhoneScreen;
