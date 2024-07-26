/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CustomButton} from '../../components/CustomButton';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../routes/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {decode} from 'base-64';
import Icon from 'react-native-vector-icons/Ionicons';

const stylishDog = require('../../../assets/images/stylish-dog.png');
const adoptGrid = require('../../../assets/images/adopt-grid.png');
const matumoto = require('../../../assets/images/matumoto.png');

import PawIcon from '../../../assets/images/paw-prints.svg';
import HomeIcon from '../../../assets/images/paw-home.svg';
import {PetlifyContext} from '../../context/PetlifyContext';
import {CustomJwtPayload} from '../../interfaces';

global.atob = decode;

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

  const {userInfo, setUserInfo} = useContext(PetlifyContext);

  const onPressCheckFees = () => {
    // navigation.navigate('ServicesFeesScreen' as never);
    navigation.navigate('HomeScreen2' as never);
  };

  const onPressWalkService = () => {
    navigation.navigate('ServiceRequestScreen', {service: 'walk'});
  };

  const onPressCareService = () => {
    navigation.navigate('ServiceRequestScreen', {service: 'care'});
  };

  // TODO: Save data to store
  const getAccessToken = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log('accessToken from home', accessToken);
    if (accessToken) {
      const userData = jwtDecode<CustomJwtPayload>(accessToken);
      setUserInfo({
        name: userData?.user_metadata?.name,
        lastName: userData?.user_metadata?.last_name,
        email: userData?.user_metadata?.email,
        phone: '1234567890',
        id: userData?.user_metadata?.sub,
        provider: userData?.app_metadata?.provider,
        picture: 'https://lh3.google.com/u/0/d/1234567890=w100-h100',
      });
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <ScrollView
      style={{...styles.container, paddingTop: marginTop + 20}}
      contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.header}>
        <Image source={matumoto} style={styles.profileImage} />
        <View>
          <Text style={styles.profileName}>
            {userInfo.name} {userInfo.lastName}
          </Text>
          <TouchableOpacity style={styles.locationSection} activeOpacity={0.3}>
            <Text style={styles.locationText}>San miguel del Monte</Text>
            <Icon name="chevron-down-sharp" size={15} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.spacer} />
        <View style={styles.shadow}>
          <TouchableOpacity
            activeOpacity={0.3}
            style={styles.bellIconContainer}>
            <Icon name="notifications-sharp" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.servicesSection}>
        <Text style={styles.servicesTitle}>Nuestros Servicios</Text>
        <View style={styles.servicesRow}>
          <TouchableOpacity
            style={styles.serviceCard}
            activeOpacity={0.3}
            onPress={onPressWalkService}>
            <PawIcon width={35} height={35} />
            <Text style={styles.cardText}>Paseo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.serviceCard}
            activeOpacity={0.3}
            onPress={onPressCareService}>
            <HomeIcon style={styles.homeIcon} width={30} height={30} />
            <Text style={styles.cardText}>Cuidado</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.checkOurFeesContainer}>
        <Image source={stylishDog} style={styles.serviceFeeImage} />
        <View style={styles.serviceFeeTextContainer}>
          <Text style={styles.serviceFeeTitle}>¿Por qué Nosotros?</Text>
          <Text style={styles.serviceFeeSubtitle}>
            Precios bajos con excelentes paseadores y cuidadores para mejorar la
            vida de tu mascota.
          </Text>
          <View style={styles.spacer} />
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
            Te conectamos con una comunidad de mascotas en adopcion para que
            encuentres la compañia ideal para tu vida.
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
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 10,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  locationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  spacer: {
    flex: 1,
  },
  bannerButton: {
    backgroundColor: '#1E96FF',
    paddingVertical: 8,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  bannerButtonText: {
    fontFamily: 'Poppins-Medium',
    color: '#FFF',
  },
  shadow: {
    shadowColor: '#AFAFAF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    borderRadius: 50,
  },
  bellIconContainer: {
    height: 45,
    width: 45,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
    width: 35,
    height: 35,
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
  servicesSection: {
    width: '100%',
    marginTop: 20,
  },
  servicesTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#000',
  },
  servicesRow: {
    flexDirection: 'row',
    height: 100,
    gap: 10,
    marginTop: 10,
  },
  serviceCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeIcon: {
    marginTop: 5,
  },
  cardText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
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
        shadowRadius: 3,
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
    color: '#000',
  },
  serviceFeeSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
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
    color: '#000',
  },
  nextFeatureSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
    color: '#000',
  },
});

export default HomeScreen;
