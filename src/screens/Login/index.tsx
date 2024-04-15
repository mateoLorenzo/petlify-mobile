import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.image} />
      <Text style={styles.title}>Bienvenido a Petlify!</Text>
      <Text style={styles.subtitle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, nemo. Qui
        itaque rerum sed sint inventore! Nesciunt amet sunt pariatur. since.
      </Text>

      <View style={styles.inputsContainer}>
        <TextInput style={styles.loginInput} placeholder="Email" />
        <TextInput style={styles.loginInput} placeholder="Password" />
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Olvidé mi contraseña</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.spacer} />

      <View style={styles.loginButtonsContainer}>
        <TouchableOpacity style={styles.logInButton}>
          <Text style={styles.loginButtonText}>Iniciar sesion</Text>
        </TouchableOpacity>

        <View style={styles.divisorContainer}>
          <View style={styles.divisorLine} />
          <Text style={styles.divisorText}>o ingresa con</Text>
          <View style={styles.divisorLine} />
        </View>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
  },
  inputsContainer: {
    width: '100%',
    marginTop: 20,
  },
  loginInput: {
    width: '100%',
    height: 55,
    borderWidth: 0.5,
    borderColor: '#979797',
    borderRadius: 3,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  forgotPasswordText: {
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
  spacer: {
    flex: 1,
  },
  loginButtonsContainer: {
    width: '100%',
    marginTop: 20,
  },
  logInButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#6B6B6B',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  divisorContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  divisorText: {
    marginHorizontal: 10,
  },
  divisorLine: {
    height: 1,
    backgroundColor: 'black',
    flex: 1,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    width: '48%',
    height: 55,
    borderColor: '#B5B5B5',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B6B6B',
  },
});

export default LoginScreen;
