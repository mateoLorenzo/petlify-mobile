import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthHeader} from '../../components/AuthHeader';
import {AuthFooter} from '../../components/AuthFooter';
import Icon from 'react-native-vector-icons/Ionicons';

const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          style={styles.contentContainer}
          bounces={false}>
          <AuthHeader divisorText="Registrarme" />

          <View style={styles.inputsContainer}>
            <View style={styles.nameInputContainer}>
              <TextInput
                style={styles.nameInput}
                placeholderTextColor={'#8F8F8F'}
                placeholder="Nombre"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TextInput
                style={{...styles.nameInput, ...styles.marginLeft}}
                placeholderTextColor={'#8F8F8F'}
                placeholder="Apellido"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <TextInput
              style={styles.registerInput}
              placeholderTextColor={'#8F8F8F'}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
            />
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.registerInput}
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

            <TextInput
              style={styles.registerInput}
              placeholderTextColor={'#8F8F8F'}
              placeholder="Telefono"
              autoCapitalize="none"
              keyboardType="phone-pad"
              autoCorrect={false}
            />
          </View>

          <AuthFooter authType="register" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
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
    marginTop: 10,
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
  registerInput: {
    width: '100%',
    height: 55,
    borderWidth: 0.5,
    borderColor: '#8F8F8F',
    borderRadius: 3,
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Regular',
  },
  nameInput: {
    flex: 1,
    height: 55,
    borderWidth: 0.5,
    borderColor: '#8F8F8F',
    borderRadius: 3,
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Regular',
  },
  marginLeft: {
    marginLeft: 10,
  },
  nameInputContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default RegisterScreen;
