import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Pet} from '../../interfaces';
import React from 'react';
import {Image} from 'react-native';
import {Text} from 'react-native';

const {width} = Dimensions.get('window');

interface PetCardProps extends Pet {
  onPressEdit: () => void;
}

export const PetCard = ({
  name,
  years: age,
  gender,
  breed,
  image,
  onPressEdit,
}: PetCardProps) => {
  const genericPetImage =
    'https://static.vecteezy.com/system/resources/previews/022/047/226/non_2x/black-animal-paw-print-vector.jpg';

  return (
    <View style={styles.petCardContainer}>
      <View style={styles.petCardTopSection}>
        {image ? (
          <Image source={image} style={styles.petCardImage} />
        ) : (
          <Image source={{uri: genericPetImage}} style={styles.petCardImage} />
        )}
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

const styles = StyleSheet.create({
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  petCardImage: {
    height: 80,
    width: 80,
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
    borderRadius: 6,
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
