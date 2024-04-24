import React, {useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Logo from '../../../assets/images/logo.svg';
import {CustomTextInput} from '../../components/CustomTextInput';
import {useForm, useWatch} from 'react-hook-form';
import {CustomButton} from '../../components/CustomButton';
// import {OTPInput} from '../../components/OneTimePassCode';// TODO: Remove component
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import CountdownTimer from '../../components/CountdownTimer';
import {phoneRegex} from '../../constants';
import {useAnimation} from '../../hooks/useAnimation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const RegisterPhoneScreen = () => {
  const {
    inputPosition,
    confirmPosition,
    backButtonPosition,
    confirmButtonWidth,
    firstItemsOpacity,
    secondItemsOpacity,
    moveInputLeft,
    moveInputRight,
    moveConfirmLeft,
    moveConfirmRight,
    reduceContinueButtonWidth,
    expandContinueButtonWidth,
    showBackButton,
    hideBackButton,
    fadeInSecondItems,
    fadeOutSecondItems,
    fadeInFirstItems,
    fadeOutFirstItems,
  } = useAnimation();

  const {
    control,
    formState: {errors},
    reset,
    trigger,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [activeScreen, setActiveScreen] = useState<'phone' | 'code'>('phone');
  const phoneValue = useWatch({control, name: 'phone'});
  const phoneCodeValue = useWatch({control, name: 'phoneCode'});
  const {navigate} = useNavigation();
  const {top} = useSafeAreaInsets();

  const setValidationScreen = () => {
    setActiveScreen('code');
    moveInputLeft();
    moveConfirmLeft();
    reduceContinueButtonWidth();
    showBackButton();
    fadeInSecondItems();
    fadeOutFirstItems();
    reset({phoneCode: ''});
  };

  const onSubmit = async () => {
    const output = await trigger('phone');
    if (output === true) {
      setValidationScreen();
    }

    if (phoneCodeValue?.length === 4) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('RegisterPetScreen' as never);
      }, 3000);
    }
  };

  const goBack = () => {
    setActiveScreen('phone');
    moveInputRight();
    moveConfirmRight();
    expandContinueButtonWidth();
    hideBackButton();
    fadeOutSecondItems();
    fadeInFirstItems();
    reset({phoneCode: ''});
  };

  const getButtonColor = (): '#1E96FF' | 'gray' => {
    if (activeScreen === 'code' && phoneCodeValue?.length !== 4) {
      return 'gray';
    }
    return '#1E96FF';
  };

  const validateChangeField = () => {
    if (errors.phone) {
      trigger('phone');
    }
  };

  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity onPress={() => {}}>
        <Logo
          height={150}
          width={150}
          style={{...styles.logo, marginTop: top + 20}}
        />
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
              validateChangeField={validateChangeField}
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
            <CustomTextInput
              name="phoneCode"
              control={control}
              placeholderTextColor={'#8F8F8F'}
              placeholder="1234"
              autoCapitalize="none"
              keyboardType="phone-pad"
              autoCorrect={false}
              style={styles.codeInput}
              rules={{
                required: 'Debes poner tu código!',
                pattern: {
                  value: phoneRegex,
                  message: 'Ingrese un código valido',
                },
              }}
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
              onPress={onSubmit}
              loading={isLoading}
              containerStyle={styles.confirmContainer}
              style={{
                ...styles.confirmButton,
                backgroundColor: getButtonColor(),
              }}
              labelStyle={styles.confirmButtonLabel}
            />
          </Animated.View>
        </View>

        <Animated.View style={{opacity: secondItemsOpacity}}>
          <CountdownTimer startTimer={activeScreen === 'code'} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  logo: {
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
  codeInput: {
    width: '100%',
    marginTop: 20,
    letterSpacing: 10,
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
    marginTop: 10,
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
    alignSelf: 'flex-end',
  },
  confirmButton: {
    height: 60,
  },
  confirmButtonLabel: {
    fontSize: 18,
  },
});

export default RegisterPhoneScreen;
