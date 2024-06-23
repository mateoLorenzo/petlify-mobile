import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import Logo from '../../../assets/images/logo.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CustomButton} from '../../components/CustomButton';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../routes/StackNavigator';
const walker = require('../../../assets/images/paseo.png');
const sitter = require('../../../assets/images/cuidado.png');
const stylishDog = require('../../../assets/images/stylish-dog.png');
const adoptGrid = require('../../../assets/images/adopt-grid.png');

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  'HomeScreen'
>;
type HomeScreenRouteProp = RouteProp<RootStackParams, 'HomeScreen'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {top: marginTop} = useSafeAreaInsets();

  const onPressCheckFees = () => {
    navigation.navigate('ServicesFeesScreen' as never);
  };

  const onPressWalkService = () => {
    navigation.navigate('ServiceRequestScreen', {service: 'walk'});
  };

  const onPressCareService = () => {
    navigation.navigate('ServiceRequestScreen', {service: 'care'});
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContainer}>
      <Logo height={100} width={100} style={{marginTop}} />

      <Text style={styles.title}>¡Hola Mateo!</Text>
      <Text style={styles.subtitle}>
        ¿Qué servicio te gustaria agendar para Lucy?
      </Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.walkServiceButton}
          onPress={onPressWalkService}>
          <Image source={walker} style={styles.serviceImage} />
          <View style={styles.imageLayerContainer}>
            <View style={styles.imageBlackLayer} />
            <Text style={styles.serviceText}>Paseo</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPressCareService}>
          <Image source={sitter} style={styles.serviceImage} />
          <View style={styles.imageLayerContainer}>
            <View style={styles.imageBlackLayer} />
            <Text style={styles.serviceText}>Cuidado</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.checkOurFeesContainer}>
        <Image source={stylishDog} style={styles.serviceFeeImage} />
        <View style={styles.serviceFeeTextContainer}>
          <Text style={styles.serviceFeeTitle}>¿Por qué Nosotros?</Text>
          <Text style={styles.serviceFeeSubtitle}>
            Tenemos los mejores precios y todos los medios de pago! Mejorar la
            vida de tu mascota nunca fue tan facil.
          </Text>
          <CustomButton
            label="Ver Tarifas"
            onPress={onPressCheckFees}
            style={styles.watchFeeButton}
            labelStyle={styles.watchFeeButtonLabel}
          />
        </View>
      </View>

      <View style={styles.divisorContainer}>
        <View style={styles.leftDivisorLine} />
        <Text style={styles.divisorText}>Proximamente</Text>
        <View style={styles.rightDivisorLine} />
      </View>

      <View style={styles.nextFeatureCard}>
        <Image source={adoptGrid} style={styles.serviceFeeImage} />
        <View style={styles.nextFeatureRightContainer}>
          <Text style={styles.nextFeatureTitle}>
            ¡Encuentra tu mejor amigo!
          </Text>
          <Text style={styles.nextFeatureSubtitle}>
            Te brindaremos la oportunidad de encontrar a tu compañero ideal.
          </Text>
          <Text style={styles.nextFeatureBottomSubtitle}>
            Explora nuestra comunidad de mascotas en adopción con perfiles
            detallados, imagenes, informacion de contacto y mucho mas!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    alignItems: 'center',
    paddingBottom: 50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    marginTop: 10,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '100',
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: Platform.OS === 'ios' ? 5 : 0,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  walkServiceButton: {
    height: 150,
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
    marginRight: 10,
  },
  button: {
    width: 150,
    height: 150,
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
  },
  serviceImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageLayerContainer: {
    position: 'absolute',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  imageBlackLayer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.6,
    borderRadius: 10,
    position: 'absolute',
  },
  serviceText: {
    zIndex: 199,
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
  },
  checkOurFeesContainer: {
    minHeight: 150,
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: 'white',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  serviceFeeImage: {
    width: 140,
    backgroundColor: 'gray',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: '100%',
  },
  serviceFeeTextContainer: {
    flex: 1,
    padding: 10,
  },
  serviceFeeTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    width: '100%',
    textAlign: 'center',
  },
  serviceFeeSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginVertical: 10,
    textAlign: 'center',
  },
  divisorContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  watchFeeButton: {
    height: 40,
  },
  watchFeeButtonLabel: {
    fontSize: 14,
  },
  leftDivisorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#000',
    alignSelf: 'center',
    marginRight: 10,
  },
  divisorText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'center',
  },
  rightDivisorLine: {
    flex: 1,
    marginLeft: 10,
    height: 1,
    backgroundColor: '#000',
    alignSelf: 'center',
  },
  nextFeatureCard: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    backgroundColor: 'white',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  nextFeatureRightContainer: {
    flex: 1,
  },
  nextFeatureTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    width: '100%',
    textAlign: 'center',
    marginTop: 10,
  },
  nextFeatureSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  nextFeatureBottomSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginVertical: 10,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
