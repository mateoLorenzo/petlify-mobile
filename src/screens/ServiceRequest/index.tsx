/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Logo from '../../../assets/images/logo.svg';
import NewLocation from '../../../assets/images/new-location.svg';
import NewDate from '../../../assets/images/new-date.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomButton} from '../../components/CustomButton';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../routes/StackNavigator';
import {PetlifyContext} from '../../context/PetlifyContext';
import {locations, pets} from '../../data';
import {formatDateTimeString, getCompleteDate} from '../../utils';
import {SvgProps} from 'react-native-svg';

const {width, height} = Dimensions.get('window');

type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  'ServiceRequestScreen'
>;
type DetailsScreenRouteProp = RouteProp<
  RootStackParams,
  'ServiceRequestScreen'
>;

type Props = {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
};

interface ServiceRequestCardProps {
  onPress: () => void;
  shadowColor: string;
  logo: React.FC<SvgProps>;
  title: string;
  subtitleSelected: string;
  subtitleDefault: string;
  isSelected: boolean;
}

const ServiceRequestCard: React.FC<ServiceRequestCardProps> = ({
  onPress,
  shadowColor,
  logo: LogoComponent,
  title,
  subtitleSelected,
  subtitleDefault,
  isSelected,
}) => {
  return (
    <TouchableOpacity
      style={{...styles.cardContainer, shadowColor}}
      activeOpacity={0.7}
      onPress={onPress}>
      <View style={styles.cardImage}>
        <LogoComponent height={25} width={25} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        {isSelected ? (
          <Text style={styles.cardSubtitleSelected}>{subtitleSelected}</Text>
        ) : (
          <Text style={styles.cardSubtitle}>{subtitleDefault}</Text>
        )}
      </View>
      <Icon name="chevron-forward-sharp" size={20} color="#8A8A8A" />
    </TouchableOpacity>
  );
};

const ServiceRequestScreen: React.FC<Props> = ({navigation, route}) => {
  const {top: marginTop} = useSafeAreaInsets();
  const {service: serviceSelected} = route.params;
  const [dateToShow, setDateToShow] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState<Boolean>(false);

  const modalOpacity = useRef(new Animated.Value(1)).current;

  const {
    petSelectedIndex,
    locationSelectedIndex,
    startDaySelected,
    startHour,
    startMinute,
    endHour,
    endMinute,
  } = useContext(PetlifyContext);

  useEffect(() => {
    if (
      startDaySelected &&
      Boolean(parseFloat(startHour) + parseFloat(startMinute)) &&
      Boolean(parseFloat(endHour) + parseFloat(endMinute))
    ) {
      changeDateToShow();
    } else if (dateToShow) {
      setDateToShow('');
    }
  }, [startDaySelected, startHour, startMinute, endHour, endMinute]);

  const showModal = () => {
    Animated.timing(modalOpacity, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };
  const hideModal = (postAnimation?: () => void) => {
    Animated.timing(modalOpacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setShowConfirmModal(false);
      postAnimation && postAnimation();
    });
  };

  const changeDateToShow = () => {
    const startDate = getCompleteDate(startDaySelected, startHour, startMinute);
    const endDate = getCompleteDate(startDaySelected, endHour, endMinute);

    const formattedDate = formatDateTimeString(startDate, endDate);
    setDateToShow(formattedDate);
  };

  const onPressPet = () => navigation.navigate('SelectPetScreen');
  const onPressLocation = () => navigation.navigate('LocationScreen');
  const onPressDate = () => navigation.navigate('SelectDateScreen');

  const onPressCancel = () => {
    navigation.goBack();
  };

  const onPressContinue = () => {
    setShowConfirmModal(true);
    showModal();
  };

  const onPressConfirmService = () => {
    hideModal(() => navigation.navigate('SelectPaymentMethodScreen' as never));
    // navigation.navigate('SelectPaymentMethodScreen' as never);
  };

  const onPressCancelModal = () => {
    hideModal();
  };

  const screenTitles = {
    walk: {
      title: '¡Solicita tu Paseo!',
      subtitle: 'Te aseguramos Seguridad y Diversion',
    },
    care: {
      title: '¡Solicita tu Cuidado!',
      subtitle: 'Seguridad y Cariño para tu mascota',
    },
  };

  const getShadowColor = (cardType: 'pet' | 'location' | 'date') => {
    const conditions = {
      pet: petSelectedIndex !== null,
      location: locationSelectedIndex !== null,
      date: Boolean(dateToShow),
    };

    return conditions[cardType]
      ? 'rgba(30, 150, 225, 0.50)'
      : 'rgba(0, 0, 0, 0.4)';
  };

  const isContinueButtonDisabled = () => {
    if (petSelectedIndex === null || locationSelectedIndex === null) {
      return true;
    }
    if (!dateToShow) {
      return true;
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <Logo height={100} width={100} style={{marginTop}} />
      <Text style={styles.title}>{screenTitles[serviceSelected].title}</Text>
      <Text style={styles.subtitle}>
        {screenTitles[serviceSelected].subtitle}
      </Text>

      <ServiceRequestCard
        onPress={onPressPet}
        shadowColor={getShadowColor('pet')}
        logo={Logo}
        title="Mascota"
        subtitleSelected={
          petSelectedIndex !== null ? pets[petSelectedIndex].name : ''
        }
        subtitleDefault={`Selecciona la mascota a ${
          serviceSelected === 'care' ? 'cuidar' : 'pasear'
        }`}
        isSelected={petSelectedIndex !== null}
      />

      <ServiceRequestCard
        onPress={onPressLocation}
        shadowColor={getShadowColor('location')}
        logo={NewLocation}
        title="Direccion"
        subtitleSelected={
          locationSelectedIndex !== null
            ? locations[locationSelectedIndex].description
            : ''
        }
        subtitleDefault={`Donde quieres realizar el ${
          serviceSelected === 'care' ? 'cuidado' : 'paseo'
        }`}
        isSelected={locationSelectedIndex !== null}
      />
      <ServiceRequestCard
        onPress={onPressDate}
        shadowColor={getShadowColor('date')}
        logo={NewDate}
        title="Fecha"
        subtitleSelected={dateToShow}
        subtitleDefault={`Cuando quieres realizar el ${
          serviceSelected === 'care' ? 'cuidado' : 'paseo'
        }`}
        isSelected={!!dateToShow}
      />

      <View style={styles.spacer} />

      <CustomButton
        label="Continuar"
        onPress={onPressContinue}
        style={
          isContinueButtonDisabled() === true
            ? styles.continueButtonDisabled
            : styles.continueButton
        }
        disabled={isContinueButtonDisabled()}
      />
      <TouchableOpacity onPress={onPressCancel}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>

      {showConfirmModal && (
        <Animated.View
          style={{...styles.modalContainer, opacity: modalOpacity}}>
          <TouchableOpacity
            style={styles.pressOutsideLayer}
            onPress={onPressCancelModal}
          />
          <View style={styles.confirmServiceModal}>
            <Text style={styles.modalTitle}>Confirmemos Los Datos</Text>

            <View style={styles.resumeRow}>
              <View style={styles.locationIconContainer}>
                <Logo height={25} width={25} style={{}} />
              </View>
              <View style={styles.resumeTextContainer}>
                <Text style={styles.cardTitle}>Mascota</Text>
                <Text style={styles.resumeCardSubtitle}>
                  {petSelectedIndex !== null ? pets[petSelectedIndex].name : ''}
                </Text>
              </View>
            </View>
            <View style={styles.resumeRow}>
              <View style={styles.locationIconContainer}>
                <Icon name={'location-sharp'} size={22} color={'#1E96FF'} />
              </View>
              <View style={styles.resumeTextContainer}>
                <Text style={styles.cardTitle}>Direccion</Text>
                <Text style={styles.resumeCardSubtitle}>
                  {locationSelectedIndex &&
                    locations[locationSelectedIndex].description}
                </Text>
              </View>
            </View>

            <View style={styles.resumeRow}>
              <View style={styles.locationIconContainer}>
                <Icon name={'time'} size={22} color={'#1E96FF'} />
              </View>
              <View style={styles.resumeTextContainer}>
                <Text style={styles.cardTitle}>Fecha</Text>
                <Text style={styles.resumeCardSubtitle}>{dateToShow}</Text>
              </View>
            </View>
            <CustomButton
              label="Confirmar"
              onPress={onPressConfirmService}
              style={styles.confirmServiceButton}
              labelStyle={styles.confirmButtonLabel}
            />
            <TouchableOpacity onPress={onPressCancelModal}>
              <Text style={styles.cancelModalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 28,
    marginTop: 25,
    fontFamily: 'Poppins-Semibold',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '100',
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardContainer: {
    width: '100%',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    backgroundColor: 'white',
  },
  cardImage: {
    width: 50,
    height: 50,
    backgroundColor: '#F0F0F0',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
  },
  spacer: {
    flex: 1,
  },
  cardSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#8A8A8A',
  },
  cardSubtitleSelected: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#000000',
  },
  resumeCardSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#5B5B5B',
  },
  continueButton: {
    height: 55,
  },
  continueButtonDisabled: {
    height: 55,
    backgroundColor: 'gray',
  },
  cancelButtonText: {
    fontFamily: 'Poppins-Medium',
    marginBottom: 40,
    marginTop: 15,
    fontSize: 14,
  },
  modalContainer: {
    width,
    height,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pressOutsideLayer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  confirmServiceModal: {
    minHeight: 400,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  resumeRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  resumeTextContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  locationIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#F0F0F0',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmServiceButton: {
    height: 50,
    marginTop: 40,
  },
  confirmButtonLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  cancelModalButtonText: {
    fontFamily: 'Poppins-Medium',
    marginTop: 15,
    fontSize: 12,
    color: '#000',
  },
});

export default ServiceRequestScreen;
