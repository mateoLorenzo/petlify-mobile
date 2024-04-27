import React from 'react';
import Logo from '../../../assets/images/logo.svg';
import LinearGradient from 'react-native-linear-gradient';
import {CustomButton} from '../../components/CustomButton';
const petImage = require('../../../assets/images/register-pet2.png');
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const RegisterPetScreen = () => {
  const imageGradient = [
    'rgba(255, 255, 255, 1)',
    'rgba(255, 255, 255, .7)',
    'rgba(255, 255, 255, .2)',
    'rgba(255, 255, 255, 0)',
  ];

  const {navigate} = useNavigation();

  return (
    <View style={styles.screenContainer}>
      <Logo height={150} width={150} style={styles.logo} />
      <Text style={styles.subtitle}>Comencemos registrando a tu</Text>
      <Text style={styles.title}>¡Compañero Peludo!</Text>
      <View style={styles.flex1} />
      <View style={styles.widthFull}>
        <LinearGradient
          colors={imageGradient}
          style={styles.gradient}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
        />
        <Image source={petImage} resizeMode="contain" style={styles.image} />
      </View>

      <View style={styles.buttonsContainer}>
        <CustomButton
          onPress={() => navigate('PetDetailScreen' as never)}
          style={styles.registerButton}
          label="Continuar"
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
  widthFull: {
    width: '100%',
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
    width: '80%',
    backgroundColor: '#1976D2',
    height: 50,
  },
  registerButtonText: {
    fontSize: 16,
  },
  omitButtonText: {
    color: '#FFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginTop: 10,
  },
});

export default RegisterPetScreen;
