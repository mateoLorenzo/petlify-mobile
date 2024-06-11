import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const RadioCard = ({
  name,
  selected,
  onSelect,
  index,
  imageURL,
}: {
  name: string;
  selected: boolean;
  onSelect: (index: number) => void;
  index: number;
  imageURL: ImageSourcePropType | undefined;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{...styles.optionButton, ...styles.optionShadow}}
      onPress={() => onSelect(index)}>
      <Image style={styles.petImage} source={imageURL} />
      <Text style={styles.petName}>{name}</Text>
      <View style={styles.spacer} />
      <Icon
        name={selected ? 'radio-button-on-outline' : 'radio-button-off-outline'}
        size={30}
        color={selected ? '#1E96FF' : '#000'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionButton: {
    width: '100%',
    flexDirection: 'row',
    minHeight: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 10,
    padding: 15,
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
    borderRadius: 10,
  },
  petImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  petName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  spacer: {
    flex: 1,
  },
});
