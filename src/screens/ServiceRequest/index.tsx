import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Logo from '../../../assets/images/logo.svg';
import NewLocation from '../../../assets/images/new-location.svg';
import NewDate from '../../../assets/images/new-date.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomButton} from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const ServiceRequestScreen = () => {
  const {top: marginTop} = useSafeAreaInsets();
  const navigation = useNavigation();

  const onPressLocation = () => {
    navigation.navigate('LocationScreen' as never);
  };

  const onPressDate = () => {
    navigation.navigate('DateScreen' as never);
  };

  const onPressPet = () => {
    navigation.navigate('SelectPetScreen' as never);
  };

  const onPressCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Logo height={100} width={100} style={{marginTop}} />
      <Text style={styles.title}>¡Solicita tu Paseo!</Text>
      <Text style={styles.subtitle}>Te aseguramos Seguridad y Diversion</Text>

      <TouchableOpacity
        style={styles.cardContainer}
        activeOpacity={0.7}
        onPress={onPressLocation}>
        <View style={styles.cardImage}>
          <NewLocation height={25} width={25} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>Direccion</Text>
          <Text style={styles.cardSubtitle}>
            Donde quieres realizar el paseo
          </Text>
        </View>
        <View style={styles.spacer} />
        <Icon name="chevron-forward-sharp" size={20} color="#8A8A8A" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cardContainer}
        activeOpacity={0.7}
        onPress={onPressDate}>
        <View style={styles.cardImage}>
          <NewDate height={25} width={25} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>Fecha</Text>
          <Text style={styles.cardSubtitle}>
            Cuando quieres realizar el paseo
          </Text>
        </View>
        <View style={styles.spacer} />
        <Icon name="chevron-forward-sharp" size={20} color="#8A8A8A" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cardContainer}
        activeOpacity={0.7}
        onPress={onPressPet}>
        <View style={styles.cardImage}>
          <Logo height={25} width={25} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>Mascota</Text>
          <Text style={styles.cardSubtitle}>
            Selecciona la mascota a cuidar
          </Text>
        </View>
        <View style={styles.spacer} />
        <Icon name="chevron-forward-sharp" size={20} color="#8A8A8A" />
      </TouchableOpacity>

      <View style={styles.spacer} />

      <CustomButton
        label="Continuar"
        onPress={() => {}}
        style={styles.continueButton}
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
    // justifyContent: 'space-between',
    marginTop: 10,

    shadowColor: 'rgba(0, 0, 0, 0.20)',
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
  continueButton: {
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
