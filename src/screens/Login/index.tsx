import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthHeader} from '../../components/AuthHeader';
import {AuthFooter} from '../../components/AuthFooter';
import {CustomTextInput} from '../CustomComponents/Input';
import {useForm} from 'react-hook-form';

const LoginScreen = () => {
  const {control, handleSubmit} = useForm();

  return (
    <SafeAreaView style={styles.flex1}>
      <KeyboardAvoidingView style={styles.flex1} behavior="padding">
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          style={styles.contentContainer}
          bounces={false}>
          <StatusBar barStyle="dark-content" />

          <AuthHeader divisorText="Iniciar sesión" />

          <View style={styles.inputsContainer}>
            <CustomTextInput
              name="email"
              control={control}
              placeholderTextColor={'#8F8F8F'}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              rules={{required: 'Debes poner tu correo!'}}
            />

            <CustomTextInput
              name="password"
              control={control}
              placeholderTextColor={'#8F8F8F'}
              placeholder="Password"
              autoCapitalize="none"
              isPasswordField
              containerStyle={styles.passwordInput}
              rules={{
                required: 'Debes poner tu contraseña!',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
              }}
            />

            <TouchableOpacity activeOpacity={0.5}>
              <Text style={styles.forgotPasswordText}>
                Olvidé mi contraseña
              </Text>
            </TouchableOpacity>
          </View>

          <AuthFooter
            authType="login"
            onAuthPress={handleSubmit(data => console.log('Auth', data))}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
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
  passwordInput: {
    marginTop: 15,
    marginBottom: 10,
  },
  forgotPasswordText: {
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
    color: '#1976D2',
    fontSize: 15,
  },
});

export default LoginScreen;
