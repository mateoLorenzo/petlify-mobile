import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {AuthHeader} from '../../components/AuthHeader';
import {AuthFooter} from '../../components/AuthFooter';
import {useForm} from 'react-hook-form';
import {CustomTextInput} from '../../components/CustomTextInput';

const RegisterScreen = () => {
  const {control, handleSubmit} = useForm();

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView
          bounces={false}
          style={styles.contentContainer}
          contentContainerStyle={styles.contentContainerStyle}>
          <AuthHeader divisorText="Registrarme" />

          <View style={styles.inputsContainer}>
            <View style={styles.nameInputContainer}>
              <View style={styles.flex1}>
                <CustomTextInput
                  name="name"
                  control={control}
                  autoCorrect={false}
                  placeholder="Nombre"
                  style={styles.nameInput}
                  placeholderTextColor={'#8F8F8F'}
                  rules={{required: 'Nombre es requerido'}}
                  autoCapitalize={'words'}
                />
              </View>
              <View style={styles.flex1}>
                <CustomTextInput
                  name="lastName"
                  control={control}
                  autoCorrect={false}
                  placeholder="Apellido"
                  placeholderTextColor={'#8F8F8F'}
                  rules={{required: 'Apellido es requerido'}}
                  style={{...styles.nameInput}}
                  mainContainerStyle={{...styles.marginLeft}}
                  autoCapitalize={'words'}
                />
              </View>
            </View>

            <CustomTextInput
              name="email"
              control={control}
              placeholder="Email"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor={'#8F8F8F'}
              rules={{required: 'Debes poner tu correo!'}}
            />

            <CustomTextInput
              name="password"
              isPasswordField
              control={control}
              autoCapitalize="none"
              placeholder="Password"
              placeholderTextColor={'#8F8F8F'}
              rules={{
                required: 'Debes poner tu contraseña!',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
              }}
              containerStyle={styles.marginTop10}
            />

            <CustomTextInput
              name="phone"
              control={control}
              autoCorrect={false}
              placeholder="Telefono"
              keyboardType="phone-pad"
              style={styles.marginTop10}
              placeholderTextColor={'#8F8F8F'}
              rules={{required: 'Telefono es requerido'}}
            />
          </View>

          <AuthFooter
            authType="register"
            onAuthPress={handleSubmit(data => console.log('Auth', data))}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
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
  nameInputContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 10,
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
  flex1: {flex: 1},
  marginTop10: {marginTop: 10},
  marginLeft: {marginLeft: 10},
});

export default RegisterScreen;
