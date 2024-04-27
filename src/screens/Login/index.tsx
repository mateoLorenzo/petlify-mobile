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
import {useForm} from 'react-hook-form';
import {CustomTextInput} from '../../components/CustomTextInput';
import {useNavigation} from '@react-navigation/native';
import {emailRegex} from '../../constants';

const LoginScreen = () => {
  const {control, handleSubmit} = useForm();

  const {navigate} = useNavigation();

  const login = () => {
    // navigate('RegisterPetScreen' as never);
    navigate('PetDetailScreen' as never);
  };

  const emailIsValid = (email: string) => {
    const isValid = emailRegex.test(email);
    if (!isValid) {
      return 'El email no es válido';
    }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
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
          </View>

          {/* <AuthFooter authType="login" onAuthPress={handleSubmit(login)} /> */}
          <AuthFooter authType="login" onAuthPress={login} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
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
