import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Logo from '../../../assets/images/logo.svg';
import {CustomButton} from '../../components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const imageGradient = [
  'rgba(30, 150, 255, 0)',
  'rgba(30, 150, 255, .2)',
  'rgba(30, 150, 255, .7)',
  'rgba(30, 150, 255, 1)',
];

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Logo height={100} width={100} style={styles.image} />

        <Text style={styles.title}>¡Bienvenido a Petlify!</Text>
        <Text style={styles.subtitle}>Mejoramos la vida de tu mascota y</Text>

        <Text style={{...styles.subtitle, marginTop: 0}}>
          la cuidamos como uno mas de la familia.
        </Text>

        <CustomButton
          label="Comenzar"
          onPress={() => navigation.navigate('OnboardingScreen1' as never)}
          style={styles.continueButton}
          labelStyle={styles.continueButtonLabel}
        />
        <LottieView
          style={styles.animation}
          source={require('../../../assets/animations/party.json')}
          autoPlay
          loop={false}
        />
      </View>
      <LinearGradient
        colors={imageGradient}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 160,
    paddingHorizontal: 20,
  },
  image: {},
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginTop: 30,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: '#5E4F4F',
    marginTop: 5,
  },
  animation: {
    width,
    height: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  continueButton: {
    height: 50,
    marginTop: 50,
  },
  continueButtonLabel: {
    fontSize: 16,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    zIndex: -1,
    width: width,
    height: height * 0.6,
  },
});

export default WelcomeScreen;
