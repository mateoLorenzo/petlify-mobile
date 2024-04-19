import React from 'react';
import Logo from '../../../assets/images/logo.svg';
import LinearGradient from 'react-native-linear-gradient';
import {CustomButton} from '../../components/CustomButton';
const petImage = require('../../../assets/images/register-pet.png');
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const RegisterPetScreen = () => {
  const imageGradient = [
    'rgba(255, 255, 255, 1)',
    'rgba(255, 255, 255, .7)',
    'rgba(255, 255, 255, .2)',
    'rgba(255, 255, 255, 0)',
  ];

  return (
    <View style={styles.screenContainer}>
      <Logo height={150} width={150} style={styles.logo} />
      <Text style={styles.subtitle}>Comencemos registrando a tu</Text>
      <Text style={styles.title}>¡Compañero Peludo!</Text>
      <View style={styles.flex1}>
        <LinearGradient
          colors={imageGradient}
          style={styles.gradient}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
        />
        <Image source={petImage} style={styles.image} />
      </View>

      <View style={styles.buttonsContainer}>
        <CustomButton
          disabled
          onPress={() => {}}
          style={styles.registerButton}
          label="Registrar Mascota"
          labelStyle={styles.registerButtonText}
        />
        <TouchableOpacity>
          <Text style={styles.omitButtonText}>Omitir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  logo: {
    marginTop: 80,
  },
  subtitle: {
    fontSize: 18,
    color: '#565656',
    marginTop: 40,
    fontFamily: 'Poppins-Regular',
  },
  title: {
    fontSize: 32,
    color: '#1976D2',
    fontFamily: 'Poppins-SemiBold',
    marginTop: -5,
    marginBottom: 20,
  },
  flex1: {
    flex: 1,
  },
  gradient: {
    width: '100%',
    height: 120,
    position: 'absolute',
    zIndex: 1,
  },
  image: {
    flexGrow: 1,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
  },
  registerButton: {
    width: '90%',
    backgroundColor: '#1976D2',
    height: 60,
  },
  registerButtonText: {
    fontSize: 20,
  },
  omitButtonText: {
    color: '#FFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginTop: 10,
  },
});

export default RegisterPetScreen;
