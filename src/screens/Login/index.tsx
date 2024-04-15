import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Logo from '../../../assets/images/logo.svg';
import GoogleIcon from '../../../assets/images/google.svg';
import FacebookIcon from '../../../assets/images/facebook.svg';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.screenContainer1}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.contentContainer}
        bounces={false}>
        <StatusBar barStyle="dark-content" />
        <Logo height={150} width={150} style={styles.image} />
        <Text style={styles.title}>Bienvenido a Petlify</Text>
        <Text style={styles.subtitle}>¡Mejora la vida de tu mascota!</Text>

        <View style={styles.divisorContainer}>
          <View style={styles.divisorLine} />
          <Text style={styles.divisorText}>Iniciar sesión</Text>
          <View style={styles.divisorLine} />
        </View>

        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.loginInput}
            placeholderTextColor={'#8F8F8F'}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
          />
          <TextInput
            style={styles.loginInput}
            placeholderTextColor={'#8F8F8F'}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={styles.forgotPasswordText}>Olvidé mi contraseña</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginButtonsContainer}>
          <TouchableOpacity style={styles.logInButton} activeOpacity={0.5}>
            <Text style={styles.loginButtonText}>Iniciar sesion</Text>
          </TouchableOpacity>
          <View style={styles.bottomDivisorContainer}>
            <View style={styles.divisorLine} />
            <Text style={styles.bottomDivisorText}>o ingresa con</Text>
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
          activeOpacity={0.5}>
          <Text style={styles.registerTextLeft}>
            ¿Aún no tienes una cuenta?
          </Text>
          <Text style={styles.registerTextRight}>Únete ahora</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer1: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: '#5C5C5C',
  },
  inputsContainer: {
    width: '100%',
  },
  loginInput: {
    width: '100%',
    height: 55,
    borderWidth: 0.5,
    borderColor: '#8F8F8F',
    borderRadius: 3,
    marginBottom: 15,
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Regular',
  },
  forgotPasswordText: {
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
    color: '#1976D2',
    fontSize: 15,
  },
  spacer: {
    marginTop: 20,
    flex: 1,
  },
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
  divisorContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
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

export default LoginScreen;
