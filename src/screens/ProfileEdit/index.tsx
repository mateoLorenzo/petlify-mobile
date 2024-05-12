import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CustomButton} from '../../components/CustomButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CustomTextInput} from '../../components/CustomTextInput';
import {validateConfirmPassword, validatePassword} from '../../constants';
import {useRegisterForm} from '../../hooks/useFormValidations';

const formFields = ['oldPassword', 'password', 'confirmPassword'];

const DismissKeyboard = ({children}: {children: React.ReactNode}) => (
  <TouchableOpacity
    activeOpacity={1}
    style={styles.dismissKeyboard}
    onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableOpacity>
);

const ProfileEditScreen = () => {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    validateBlurField,
    validateChangeField,
    validateBlurPassword,
    validateChangePassword,
    getFieldColor,
    errorMessagesToShow,
    currentPassword,
  } = useRegisterForm(formFields);

  const goBack = () => {
    navigation.goBack();
  };

  const changePassword = () => {
    goBack();
  };

  const renderErrorMessages = () => {
    return (
      <>
        {errorMessagesToShow?.map((error, index) => (
          <Text key={`${index}-${error}`} style={styles.errorMessage}>
            {error}
          </Text>
        ))}
      </>
    );
  };

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{...styles.container, paddingTop: top}}>
          <TouchableOpacity style={styles.goBackButton} onPress={goBack}>
            <Icon name="arrow-back" size={25} color="#000" />
          </TouchableOpacity>

          <Text style={styles.title}>Editar Contraseña</Text>
          <Text style={styles.subtitle}>
            ¿Seguro que quieres cambiar tu contraseña?
          </Text>

          <CustomTextInput
            name="oldPassword"
            isPasswordField
            control={control}
            autoCapitalize="none"
            placeholder="Contraseña Actual"
            placeholderTextColor={'#8F8F8F'}
            fieldColor={getFieldColor('oldPassword')}
            errorMessages={() => renderErrorMessages()}
            containerStyle={styles.newPassword}
            rules={{required: 'Ingrese su contraseña'}}
          />
          <CustomTextInput
            name="password"
            isPasswordField
            control={control}
            autoCapitalize="none"
            placeholder="Nueva contraseña"
            placeholderTextColor={'#8F8F8F'}
            validateBlurField={validateBlurField}
            validateChangeField={validateChangeField}
            fieldColor={getFieldColor('password')}
            errorMessages={() => renderErrorMessages()}
            containerStyle={styles.newPassword}
            rules={{
              required: 'Ingrese su contraseña',
              validate: validatePassword,
            }}
          />

          <CustomTextInput
            name="confirmPassword"
            isPasswordField
            control={control}
            autoCapitalize="none"
            placeholder="Confirmar contraseña"
            placeholderTextColor={'#8F8F8F'}
            validateBlurField={validateBlurPassword}
            validateChangeField={validateChangePassword}
            fieldColor={getFieldColor('confirmPassword')}
            containerStyle={styles.confirmPassword}
            rules={{
              required: 'Ingrese su confirmacion de contraseña',
              validate: value =>
                validateConfirmPassword(currentPassword, value),
            }}
          />

          <View style={styles.spacer} />

          <CustomButton
            style={styles.button}
            labelStyle={styles.buttonText}
            label="Guardar"
            onPress={handleSubmit(changePassword)}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={styles.buttonSpacer} />
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  dismissKeyboard: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  goBackButton: {
    width: '100%',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Poppins-SemiBold',
    width: '100%',
    color: '#000',
    marginTop: 10,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#000',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 55,
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Regular',
    borderColor: 'lightgray',
  },
  newPassword: {
    marginTop: 30,
  },
  confirmPassword: {
    marginTop: 20,
  },
  spacer: {
    flex: 1,
  },
  button: {
    height: 65,
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  buttonSpacer: {
    height: 40,
  },

  flex1: {
    flex: 1,
  },
  marginTop10: {
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});

export default ProfileEditScreen;
