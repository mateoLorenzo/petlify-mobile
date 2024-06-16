import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Logo from '../../../assets/images/logo.svg';
import GoogleIcon from '../../../assets/images/google.svg';
import FacebookIcon from '../../../assets/images/facebook.svg';
import EmailIcon from '../../../assets/images/email.svg';
import {useNavigation} from '@react-navigation/native';

const PreSignUpScreen = () => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <View style={{...styles.container, paddingTop: top}}>
      <Logo height={100} width={100} style={styles.logo} />
      <Text style={styles.title}>¡Registrate Para Ingresar!</Text>
      <Text style={styles.subtitle}>Elige como te gustaria registrarte</Text>

      <TouchableOpacity
        style={styles.socialButton}
        activeOpacity={0.6}
        onPress={() => navigation.navigate('BottomTabNavigator' as never)}>
        <GoogleIcon height={22} width={22} />
        <Text style={styles.socialButtonText}>Ingresar Con Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.socialButton}
        activeOpacity={0.6}
        onPress={() => navigation.navigate('BottomTabNavigator' as never)}>
        <FacebookIcon height={22} width={22} />
        <Text style={styles.socialButtonText}>Ingresar Con Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.socialButton}
        activeOpacity={0.6}
        onPress={() => navigation.navigate('RegisterScreen' as never)}>
        <EmailIcon height={22} width={22} />
        <Text style={styles.socialButtonText}>Ingresar Con Email</Text>
      </TouchableOpacity>

      <View style={styles.spacer} />

      <Text style={styles.disclaimerText}>
        Al registrarte estas aceptando nuestros
      </Text>
      <TouchableOpacity>
        <Text style={styles.termsAndConditionsText}>
          Terminos y Condiciones
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
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
    marginBottom: 40,
    fontWeight: '100',
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  socialButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#D2D2D2',
    width: '100%',
    paddingVertical: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  socialButtonText: {
    color: '#4F4F4F',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginLeft: 10,
  },
  spacer: {
    flex: 1,
  },
  disclaimerText: {
    color: '#8F8F8F',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  termsAndConditionsText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 40,
    textDecorationLine: 'underline',
  },
});

export default PreSignUpScreen;
