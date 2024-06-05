import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {CustomButton} from '../../../components/CustomButton';
const walker = require('../../../../assets/images/walk.png');

const {height, width} = Dimensions.get('window');

const OnboardingScreen2 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={walker} />
      <Text style={styles.title}>¡Conecta con Cuidadores!</Text>
      <Text style={styles.description}>
        Te conectamos con paseadores de confianza en tu zona para que tu mascota
        pueda disfrutar de paseos seguros y entretenidos.
      </Text>

      <View style={styles.spacer} />
      <CustomButton
        label="Continuar"
        onPress={() => navigation.navigate('OnboardingScreen3' as never)}
        style={styles.continueButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    height: height * 0.5,
    width,
    backgroundColor: 'gray',
  },
  title: {
    fontSize: 20,
    marginTop: 60,
    fontFamily: 'Poppins-Bold',
  },
  description: {
    fontSize: 15,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Medium',
    color: '#747474',
  },
  spacer: {
    flex: 1,
  },
  continueButton: {
    marginBottom: 40,
    width: width - 20,
    height: 55,
  },
});

export default OnboardingScreen2;
