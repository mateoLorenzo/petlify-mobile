import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import GoogleIcon from '../../../assets/images/google.svg';
import FacebookIcon from '../../../assets/images/facebook.svg';
import {useNavigation} from '@react-navigation/native';

interface IScreenProps {
  authType: 'login' | 'register';
  onAuthPress: () => void;
}

export const AuthFooter = ({authType, onAuthPress}: IScreenProps) => {
  const navigation = useNavigation();

  let authAction: string = '';
  let divisorText: string = '';
  let screenToNavigate: string | never = '';
  let authQuestion: string = '';
  let authQuestionAction: string = '';

  if (authType === 'login') {
    authAction = 'Iniciar sesion';
    divisorText = 'O inicia sesión con';
    screenToNavigate = 'registerScreen';
    authQuestion = '¿Aún no tienes una cuenta?';
    authQuestionAction = 'Únete ahora';
  }

  if (authType === 'register') {
    authAction = 'Registrarme';
    divisorText = 'o registrate con';
    screenToNavigate = 'loginScreen';
    authQuestion = '¿Ya tienes una cuenta?';
    authQuestionAction = 'Inicia sesion ahora';
  }

  return (
    <>
      <View style={styles.loginButtonsContainer}>
        <TouchableOpacity
          style={styles.logInButton}
          activeOpacity={0.5}
          onPress={onAuthPress}>
          <Text style={styles.loginButtonText}>{authAction}</Text>
        </TouchableOpacity>
        <View style={styles.bottomDivisorContainer}>
          <View style={styles.divisorLine} />
          <Text style={styles.bottomDivisorText}>{divisorText}</Text>
          <View style={styles.divisorLine} />
        </View>
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.5}>
            <GoogleIcon height={25} width={25} />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.5}>
            <FacebookIcon height={25} width={25} />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.spacer} />

      <TouchableOpacity
        style={styles.registerTextContainer}
        activeOpacity={1.8}
        onPress={() => navigation.navigate(screenToNavigate as never)}>
        <Text style={styles.registerTextLeft}>{authQuestion}</Text>
        <Text style={styles.registerTextRight}>{authQuestionAction}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  loginButtonsContainer: {
    width: '100%',
    marginTop: 20,
  },
  logInButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#1E96FF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  bottomDivisorContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  divisorText: {
    marginHorizontal: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#8F8F8F',
    fontSize: 16,
  },
  bottomDivisorText: {
    marginHorizontal: 15,
    fontFamily: 'Poppins-Medium',
    color: '#8F8F8F',
    fontSize: 14,
  },
  divisorLine: {
    height: 1,
    backgroundColor: '#8F8F8F',
    flex: 1,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    width: '48%',
    height: 55,
    borderColor: '#1E96FF',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  socialButtonText: {
    fontSize: 15,
    color: '#1E96FF',
    fontFamily: 'Poppins-Medium',
    marginLeft: 10,
  },
  spacer: {
    marginTop: 20,
    flex: 1,
  },
  registerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
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
    fontFamily: 'Poppins-Medium',
    color: '#1E96FF',
    fontSize: 15,
  },
});
