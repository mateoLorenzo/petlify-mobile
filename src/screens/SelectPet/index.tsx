/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomButton} from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {RadioCard} from '../../components/RadioCard';
import {pets} from '../../data';
import {PetlifyContext} from '../../context/PetlifyContext';

const SelectPetScreen = () => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();

  const {petSelectedIndex, setPetSelectedIndex} = useContext(PetlifyContext);

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.titleContainer,
          marginTop: Platform.OS === 'ios' ? top + 20 : top + 40,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backArrowButton}>
          <Icon name="arrow-back" size={25} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Mascota</Text>
      </View>
      {pets.map((pet, index) => (
        <RadioCard
          key={index}
          name={pet.name}
          selected={petSelectedIndex === index}
          onSelect={setPetSelectedIndex}
          index={index}
          imageURL={pet.image}
          cardType="pet"
        />
      ))}
      <View style={styles.spacer} />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('RegisterPetScreen' as never)}
        style={{...styles.registerButton, ...styles.optionShadow}}>
        <Icon name="add-outline" size={30} color="#1E96FF" />
        <Text style={styles.registerButtonText}>Registrar Mascota</Text>
      </TouchableOpacity>
      <CustomButton
        label="Continuar"
        onPress={() => navigation.goBack()}
        disabled={petSelectedIndex === null}
        style={{
          ...styles.continueButton,
          backgroundColor: petSelectedIndex === null ? 'gray' : '#1E96FF',
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
    color: '#000',
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
    shadowColor: '#757575',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 2,
    shadowRadius: 1,
    borderRadius: 5,
  },
  spacer: {
    flex: 1,
  },
  registerButton: {
    width: '100%',
    flexDirection: 'row',
    minHeight: 50,
    backgroundColor: 'white',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Platform.OS === 'android' ? 1 : 0,
    borderColor: Platform.OS === 'android' ? '#D2D2D2' : 'transparent',
  },
  registerButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginLeft: 10,
    color: '#1E96FF',
  },
  continueButton: {
    marginTop: 10,
    height: 55,
    marginBottom: 40,
  },
});

export default SelectPetScreen;
