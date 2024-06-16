/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RadioCard} from '../../components/RadioCard';
import {useNavigation} from '@react-navigation/native';
import {CustomButton} from '../../components/CustomButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {locations} from '../../data';
import {PetlifyContext} from '../../context/PetlifyContext';

const LocationScreen = () => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();
  const {locationSelectedIndex, setLocationSelectedIndex} =
    useContext(PetlifyContext);

  const onPressNewAddress = () => {
    navigation.navigate('NewLocationScreen' as never);
  };

  return (
    <View style={styles.container}>
      <View style={{...styles.titleContainer, marginTop: top + 20}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backArrowButton}>
          <Icon name="arrow-back" size={25} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Dirección</Text>
      </View>
      {locations.map((location, index) => (
        <RadioCard
          key={index}
          name={location.title}
          selected={locationSelectedIndex === index}
          onSelect={setLocationSelectedIndex}
          index={index}
          imageURL={undefined}
          cardType="location"
          locationDescription={location.description}
        />
      ))}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressNewAddress}
        style={{...styles.registerButton, ...styles.optionShadow}}>
        <Icon name="add-outline" size={30} color="#1E96FF" />
        <Text style={styles.registerButtonText}>Nueva Direccion</Text>
      </TouchableOpacity>
      <View style={styles.spacer} />
      <CustomButton
        label="Continuar"
        onPress={() => navigation.goBack()}
        disabled={locationSelectedIndex === null}
        style={{
          ...styles.continueButton,
          backgroundColor: locationSelectedIndex === null ? 'gray' : '#1E96FF',
        }}
      />
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
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  backArrowButton: {
    position: 'absolute',
    left: 0,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionShadow: {
    shadowColor: '#ADADAD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 2,
    shadowRadius: 3,
    borderRadius: 10,
  },
  spacer: {
    flex: 1,
  },
  registerButton: {
    width: '100%',
    flexDirection: 'row',
    minHeight: 50,
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginLeft: 10,
    color: '#1E96FF',
  },
  continueButton: {
    marginTop: 20,
    height: 55,
    marginBottom: 40,
  },
});

export default LocationScreen;
