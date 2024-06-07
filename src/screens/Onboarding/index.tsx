import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Animated} from 'react-native';
import {CustomButton} from '../../components/CustomButton';

const walkService = require('../../../assets/images/walk.png');
const careService = require('../../../assets/images/care.png');
const adoptService = require('../../../assets/images/adopt.png');

const {height, width} = Dimensions.get('window');

interface ScreenProps {
  onPress?: () => void;
  goBack?: () => void;
}

const Screen1 = ({onPress}: ScreenProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={walkService} />

      <View style={styles.stepperContainer}>
        <View style={[styles.stepDot, styles.doneStepDot]} />
        <View style={styles.stepDot} />
        <View style={styles.stepDot} />
      </View>

      <Text style={styles.title}>¡Conecta con Paseadores!</Text>
      <Text style={styles.description}>
        Te conectamos con paseadores de confianza en tu zona para que tu mascota
        pueda disfrutar de paseos seguros y entretenidos.
      </Text>

      <View style={styles.spacer} />
      <CustomButton
        label="Continuar"
        onPress={onPress ? onPress : () => {}}
        style={styles.continueButton}
      />
    </View>
  );
};

const Screen2 = ({onPress, goBack}: ScreenProps) => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={careService} />
      <View style={styles.stepperContainer}>
        <View style={[styles.stepDot, styles.doneStepDot]} />
        <View style={[styles.stepDot, styles.doneStepDot]} />
        <View style={styles.stepDot} />
      </View>
      <TouchableOpacity style={{...styles.goBackButton, top}} onPress={goBack}>
        <Icon name="arrow-back" size={25} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>¡Encuentra Cuidadores!</Text>
      <Text style={styles.description}>
        Te acercamos a cuidadores en tu zona para asegurar que tu mascota reciba
        atención y amor el tiempo que necesites.
      </Text>

      <View style={styles.spacer} />
      <CustomButton
        label="Continuar"
        onPress={onPress ? onPress : () => {}}
        style={styles.continueButton}
      />
    </View>
  );
};

const Screen3 = ({goBack}: ScreenProps) => {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={adoptService} />
      <View style={styles.stepperContainer}>
        <View style={[styles.stepDot, styles.doneStepDot]} />
        <View style={[styles.stepDot, styles.doneStepDot]} />
        <View style={[styles.stepDot, styles.doneStepDot]} />
      </View>
      <TouchableOpacity style={{...styles.goBackButton, top}} onPress={goBack}>
        <Icon name="arrow-back" size={25} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Proximamente</Text>
      <Text style={styles.subtitle}>Adopcion</Text>
      <Text style={styles.description}>
        Estamos trabajando para hacer de petlify una plataforma en donde puedas
        conectar con amigos peludos en busqueda de un hogar.
      </Text>
      <Text style={styles.launchText}>
        Lanzamiento: <Text style={styles.launchDate}>Octubre 2024</Text>
      </Text>

      <View style={styles.spacer} />
      <CustomButton
        label="Continuar"
        onPress={() => navigation.navigate('PreSignUpScreen' as never)}
        style={styles.continueButton}
      />
    </View>
  );
};

type ScreenTypes = 'screen1' | 'screen2' | 'screen3';
type ActionTypes = 'fadeIn' | 'fadeOut';

const OnboardingScreens = () => {
  const [currentScreen, setCurrentScreen] = useState<number>(1);

  const screen1Opacity = useRef(new Animated.Value(1)).current;
  const screen2Opacity = useRef(new Animated.Value(0)).current;
  const screen3Opacity = useRef(new Animated.Value(0)).current;

  const changeScreenOpacity = (action: ActionTypes, screen: ScreenTypes) => {
    let screenToModify;
    switch (screen) {
      case 'screen1':
        screenToModify = screen1Opacity;
        break;
      case 'screen2':
        screenToModify = screen2Opacity;
        break;
      case 'screen3':
        screenToModify = screen3Opacity;
        break;
    }

    const value = action === 'fadeIn' ? 1 : 0;

    Animated.timing(screenToModify, {
      toValue: value,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const getDynamicStyles = (screen: ScreenTypes) => {
    if (screen === 'screen1') {
      return {opacity: screen1Opacity, zIndex: currentScreen === 1 ? 2 : 1};
    }
    if (screen === 'screen2') {
      return {opacity: screen2Opacity, zIndex: currentScreen === 2 ? 2 : 1};
    }
    return {opacity: screen3Opacity, zIndex: currentScreen === 3 ? 2 : 1};
  };

  return (
    <>
      <Animated.View
        style={{...styles.screenContainer, ...getDynamicStyles('screen1')}}>
        <Screen1
          onPress={() => {
            changeScreenOpacity('fadeOut', 'screen1');
            changeScreenOpacity('fadeIn', 'screen2');
            setCurrentScreen(2);
          }}
        />
      </Animated.View>

      <Animated.View
        style={{...styles.screenContainer, ...getDynamicStyles('screen2')}}>
        <Screen2
          onPress={() => {
            changeScreenOpacity('fadeOut', 'screen2');
            changeScreenOpacity('fadeIn', 'screen3');
            setCurrentScreen(3);
          }}
          goBack={() => {
            changeScreenOpacity('fadeOut', 'screen2');
            changeScreenOpacity('fadeIn', 'screen1');
            setCurrentScreen(1);
          }}
        />
      </Animated.View>

      <Animated.View
        style={{...styles.screenContainer, ...getDynamicStyles('screen3')}}>
        <Screen3
          goBack={() => {
            changeScreenOpacity('fadeOut', 'screen3');
            changeScreenOpacity('fadeIn', 'screen2');
            setCurrentScreen(2);
          }}
        />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  screenContainer: {
    flex: 1,
    position: 'absolute',
    height,
  },
  image: {
    height: height * 0.5,
    width,
    backgroundColor: 'gray',
  },
  goBackButton: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
  },
  stepperContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  doneStepDot: {
    backgroundColor: '#1E96FF',
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    marginHorizontal: 4,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Medium',
    color: '#747474',
  },
  description: {
    fontSize: 15,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Medium',
    color: '#747474',
  },
  launchText: {
    fontSize: 15,
    marginTop: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Medium',
    color: '#747474',
  },
  launchDate: {
    fontWeight: 'bold',
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

export default OnboardingScreens;
