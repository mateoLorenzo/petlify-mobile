/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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

const ServiceRequestScreen: React.FC<Props> = ({navigation, route}) => {
  const {top: marginTop} = useSafeAreaInsets();
  const {service: serviceSelected} = route.params;
  const [dateToShow, setDateToShow] = useState('');

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

  const navigateToPaymentMethod = () => {
    navigation.navigate('SelectPaymentMethodScreen' as never);
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

      <TouchableOpacity
        style={{...styles.cardContainer, shadowColor: getShadowColor('pet')}}
        activeOpacity={0.7}
        onPress={onPressPet}>
        <View style={styles.cardImage}>
          <Logo height={25} width={25} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>Mascota</Text>
          {petSelectedIndex !== null ? (
            <Text style={styles.cardSubtitleSelected}>
              {pets[petSelectedIndex].name}
            </Text>
          ) : (
            <Text style={styles.cardSubtitle}>
              Selecciona la mascota a{' '}
              {serviceSelected === 'care' ? 'cuidar' : 'pasear'}
            </Text>
          )}
        </View>
        <Icon name="chevron-forward-sharp" size={20} color="#8A8A8A" />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          ...styles.cardContainer,
          shadowColor: getShadowColor('location'),
        }}
        activeOpacity={0.7}
        onPress={onPressLocation}>
        <View style={styles.cardImage}>
          <NewLocation height={25} width={25} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>Direccion</Text>

          {locationSelectedIndex !== null ? (
            <Text
              style={{
                ...styles.cardSubtitleSelected,
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {locations[locationSelectedIndex].description}
            </Text>
          ) : (
            <Text style={styles.cardSubtitle}>
              Donde quieres realizar el{' '}
              {serviceSelected === 'care' ? 'cuidado' : 'paseo'}
            </Text>
          )}
        </View>
        <Icon name="chevron-forward-sharp" size={20} color="#8A8A8A" />
      </TouchableOpacity>

      <TouchableOpacity
        style={{...styles.cardContainer, shadowColor: getShadowColor('date')}}
        activeOpacity={0.7}
        onPress={onPressDate}>
        <View style={styles.cardImage}>
          <NewDate height={25} width={25} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>Fecha</Text>
          {dateToShow ? (
            <Text style={styles.cardSubtitleSelected}>{dateToShow}</Text>
          ) : (
            <Text style={styles.cardSubtitle}>
              Cuando quieres realizar el{' '}
              {serviceSelected === 'care' ? 'cuidado' : 'paseo'}
            </Text>
          )}
        </View>
        <Icon name="chevron-forward-sharp" size={20} color="#8A8A8A" />
      </TouchableOpacity>

      <View style={styles.spacer} />

      <CustomButton
        label="Continuar"
        onPress={navigateToPaymentMethod}
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
});

export default ServiceRequestScreen;
