import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CustomDropdown} from '../../../components/CustomDropdown';
import {dogBreeds} from '../../../constants';

const CustomDropdownScreen = () => {
  const [breedSelected, setBreedSelected] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Registremos Tu Mascota!</Text>
      <Text style={styles.subtitle}>¿A qué raza pertenece?</Text>
      <CustomDropdown
        breedSelected={breedSelected}
        setBreedSelected={setBreedSelected}
        breedsList={dogBreeds}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Semibold',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
  },
});

export default CustomDropdownScreen;
