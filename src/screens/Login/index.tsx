import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthHeader} from '../../components/AuthHeader';
import {AuthFooter} from '../../components/AuthFooter';

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView
        style={styles.screenSubContainer}
        behavior="padding">
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          style={styles.contentContainer}
          bounces={false}>
          <StatusBar barStyle="dark-content" />

          <AuthHeader divisorText="Iniciar sesión" />

          <View style={styles.inputsContainer}>
            <TextInput
              style={styles.loginInput}
              placeholderTextColor={'#8F8F8F'}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
            />
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.loginInput}
                placeholderTextColor={'#8F8F8F'}
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry={showPassword ? false : true}
              />
              <TouchableOpacity
                style={styles.eyeIconContainer}
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.5}>
                <Icon
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={25}
                  color="#8F8F8F"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={0.5}>
              <Text style={styles.forgotPasswordText}>
                Olvidé mi contraseña
              </Text>
            </TouchableOpacity>
          </View>

          <AuthFooter authType="login" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  screenSubContainer: {
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
  inputsContainer: {
    width: '100%',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 0,
    width: 70,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginInput: {
    width: '100%',
    height: 55,
    borderWidth: 0.5,
    borderColor: '#8F8F8F',
    borderRadius: 3,
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Regular',
  },
  forgotPasswordText: {
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
    color: '#1976D2',
    fontSize: 15,
  },
});

export default LoginScreen;
