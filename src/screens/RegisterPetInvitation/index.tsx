import React from 'react';
import Logo from '../../../assets/images/logo.svg';
import LinearGradient from 'react-native-linear-gradient';
import {CustomButton} from '../../components/CustomButton';
const petImage = require('../../../assets/images/register-pet.jpg');
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../routes/StackNavigator';

type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  'RegisterPetInvitationScreen'
>;
type DetailsScreenRouteProp = RouteProp<
  RootStackParams,
  'RegisterPetInvitationScreen'
>;

type Props = {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
};

const RegisterPetInvitationScreen: React.FC<Props> = ({navigation}) => {
  const imageGradient = [
    'rgba(255, 255, 255, 1)',
    'rgba(255, 255, 255, .7)',
    'rgba(255, 255, 255, .2)',
    'rgba(255, 255, 255, 0)',
  ];

  const onPressContinue = () => {
    navigation.navigate('RegisterPetScreen', {
      actionType: 'register',
    });
  };

  const onPressOmit = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.screenContainer}>
      <Logo height={100} width={100} style={styles.logo} />
      <Text style={styles.newTitle}>¡Ahora Tu Mascota!</Text>
      <Text style={styles.newSubtitle}>
        Registra sus datos de forma facil y rapida para comenzar a usar Petlify
      </Text>
      <View style={styles.widthFull}>
        <LinearGradient
          colors={imageGradient}
          style={styles.gradient}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
        />
        <Image
          source={petImage}
          height={70}
          width={70}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <CustomButton
          onPress={onPressContinue}
          style={styles.registerButton}
          label="Continuar"
          labelStyle={styles.registerButtonText}
        />
        <TouchableOpacity onPress={onPressOmit}>
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
  newTitle: {
    fontSize: 28,
    marginTop: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  newSubtitle: {
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'center',
    maxWidth: 350,
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
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  gradient: {
    width: '100%',
    height: 120,
    position: 'absolute',
    zIndex: 1,
  },
  image: {
    height: '100%',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
  },
  registerButton: {
    width: '80%',
    backgroundColor: '#1E96FF',
    height: 50,
  },
  registerButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  omitButtonText: {
    color: '#FFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginTop: 10,
  },
});

export default RegisterPetInvitationScreen;
