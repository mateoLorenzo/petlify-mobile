import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CustomButton} from '../../components/CustomButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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

  const goBack = () => {
    navigation.goBack();
  };

  const changePassword = () => {
    goBack();
  };

  return (
    <DismissKeyboard>
      <View style={{...styles.container, paddingTop: top}}>
        <TouchableOpacity style={styles.goBackButton} onPress={goBack}>
          <Icon name="arrow-back" size={25} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Editar Contraseña</Text>
        <Text style={styles.subtitle}>
          ¿Seguro que quieres cambiar tu contraseña?
        </Text>

        <TextInput style={styles.input} placeholder="Contraseña actual" />
        <TextInput style={styles.newPassword} placeholder="Nueva contraseña" />
        <TextInput style={styles.input} placeholder="Confirmar Contraseña" />

        <View style={styles.spacer} />

        <CustomButton
          style={styles.button}
          labelStyle={styles.buttonText}
          label="Guardar"
          onPress={changePassword}
        />
      </View>
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
    marginTop: -5,
    fontSize: 14,
    color: '#000',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 55,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Regular',
  },
  newPassword: {
    width: '100%',
    height: 55,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Regular',
    marginTop: 30,
    marginBottom: 10,
  },
  spacer: {
    flex: 1,
  },
  button: {
    height: 65,
    marginBottom: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
});

export default ProfileEditScreen;
