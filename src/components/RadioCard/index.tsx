import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SvgProps} from 'react-native-svg'; // Importar SvgProps

interface Props {
  name: string;
  selected: boolean;
  onSelect: (index: number) => void;
  index: number;
  imageURL: ImageSourcePropType | undefined;
  cardType: 'pet' | 'location' | 'payment';
  locationDescription?: string;
  imageStyles?: ImageStyle;
  titleStyles?: TextStyle;
  SvgIcon?: React.FC<SvgProps>;
}

export const RadioCard = ({
  name,
  selected,
  onSelect,
  index,
  imageURL,
  cardType = 'pet',
  locationDescription,
  imageStyles,
  titleStyles,
  SvgIcon,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{...styles.optionButton, ...styles.optionShadow}}
      onPress={() => onSelect(index)}>
      {cardType === 'pet' ? (
        <Image style={{...styles.petImage, ...imageStyles}} source={imageURL} />
      ) : cardType === 'location' ? (
        <View style={styles.locationIconContainer}>
          <Icon name={'location-sharp'} size={22} color={'#1E96FF'} />
        </View>
      ) : (
        SvgIcon && <SvgIcon width={50} height={50} />
      )}
      <View style={styles.cardTextContainer}>
        <Text style={{...styles.cardTitle, ...titleStyles}}>{name}</Text>
        {locationDescription && (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.locationDescription}>
            {locationDescription}
          </Text>
        )}
      </View>
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
    shadowColor: '#ADADAD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 2,
    shadowRadius: 3,
    borderRadius: 10,
  },
  petImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  locationIconContainer: {
    padding: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 100,
  },
  cardTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  locationDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: 'gray',
  },
});
