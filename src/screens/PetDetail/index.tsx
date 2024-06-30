import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PetHome from '../../../assets/images/pet-house.svg';
import {CustomButton} from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const lucyImage = require('../../../assets/images/lucy.jpeg');
const anastasiaImage = require('../../../assets/images/anastasia.jpeg');

const {width} = Dimensions.get('window');

interface Pet {
  name: string;
  age: number;
  gender: string;
  breed: string;
  totalWalks: number;
  totalCares: number;
  image?: any;
}

const pets: Pet[] = [
  {
    name: 'Lucy',
    age: 7,
    gender: 'Hembra',
    breed: 'Golden Retriever',
    totalWalks: 5,
    totalCares: 2,
    image: lucyImage,
  },
  {
    name: 'Anastasia',
    age: 5,
    gender: 'Hembra',
    breed: 'Munchkin gris',
    totalWalks: 0,
    totalCares: 5,
    image: anastasiaImage,
  },
];

const PetCard = ({name, age, gender, breed, image}: Pet) => {
  const navigation = useNavigation();

  const onPressEdit = () => {
    navigation.navigate('RegisterPetScreen' as never);
  };

  return (
    <View style={styles.petCardContainer}>
      <View style={styles.petCardTopSection}>
        <Image source={image} style={styles.petCardImage} />
        <View style={styles.petInfoContainer}>
          <Text style={styles.petName}>{name}</Text>
          <View>
            <Text style={styles.petTopDescription}>
              {age} Años | {gender}
            </Text>
            <Text style={styles.petBottomDescription}>{breed}</Text>
          </View>
        </View>
        <View style={styles.spacer} />
        <TouchableOpacity style={styles.editButton} onPress={onPressEdit}>
          <Text style={styles.editButtonText}>Actualizar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.serviceStatsContainer}>
        <Text style={styles.totalWalks}>Paseos: 5</Text>
        <Text style={styles.totalCares}>Cuidados: 2</Text>
      </View>
    </View>
  );
};

const PetDetailScreen = () => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();

  const onPressRegisterPet = () => {
    navigation.navigate('RegisterPetScreen' as never);
  };

  return (
    <View style={{...styles.container, paddingTop: top + 20}}>
      <Text style={styles.title}>Mis Mascotas</Text>
      <Text style={styles.subtitle}>
        Aqui puedes ver tus mascotas registradas
      </Text>

      {pets.length === 0 ? (
        <>
          <PetHome height={200} width={200} style={{marginTop: 40}} />
          <Text style={styles.registerPetTitle}>¡Registra tu Mascota!</Text>
          <Text style={styles.registerPetSubtitle}>
            Coordina de forma facil y rapida el proximo paseo o cuidado para tu
            mascota
          </Text>
        </>
      ) : (
        <FlatList
          data={pets}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <PetCard {...item} />}
          contentContainerStyle={styles.petsListContainer}
          style={styles.petsList}
        />
      )}

      <View style={styles.spacer} />

      <CustomButton
        label="Registrar Mascota"
        onPress={onPressRegisterPet}
        containerStyle={styles.registerButtonContainer}
        style={styles.registerButton}
        labelStyle={styles.registerButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontFamily: 'Poppins-SemiBold',
    paddingHorizontal: 20,
    width: '100%',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '100',
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  registerPetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
  },
  registerPetSubtitle: {
    fontSize: 16,
    fontWeight: '100',
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'center',
    marginTop: 5,
  },
  petCardContainer: {
    marginBottom: 20,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#AEAEAE',

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
  petCardTopSection: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 10,
    padding: 10,
  },
  petCardImage: {
    height: 80,
    width: 80,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  petInfoContainer: {
    marginLeft: 10,
    justifyContent: 'space-between',
    height: '100%',
  },
  petName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  petTopDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#626364',
  },
  petBottomDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#626364',
  },
  petsListContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  petsList: {
    width: '100%',
  },
  spacer: {
    flex: 1,
  },
  editButton: {
    backgroundColor: '#1E96FF',
    padding: 10,
    borderRadius: 10,
  },
  editButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  serviceStatsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  totalWalks: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    marginRight: 20,
  },
  totalCares: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },
  registerButtonContainer: {
    marginBottom: 10,
    width: width - 40,
  },
  registerButton: {
    height: 55,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default PetDetailScreen;
