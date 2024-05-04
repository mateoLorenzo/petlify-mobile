/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAnimation} from '../../hooks/useAnimation';

interface Props {
  breedsList: string[];
  breedSelected: string;
  setBreedSelected: (breed: string) => void;
  onChangeText: (text: string) => void;
  onOpen?: () => void;
  onClose?: () => void;
  // breedSearched?: string;
}

export const CustomDropdown = ({
  breedsList,
  breedSelected,
  setBreedSelected,
  onChangeText,
  onOpen,
  onClose,
}: // breedSearched,
Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [paddingBottom, setPaddingBottom] = useState(0);
  const removeTextOpacity = useRef(new Animated.Value(0)).current;
  const [breedSearched, setBreedSearched] = useState<string>('');

  const {
    arrowIconOrientation,
    dropdownHeight,
    contentContainerOpacity,
    rotateArrowIcon,
    openDropdown,
    fadeOutContent,
  } = useAnimation();

  const showRemoveText = () => {
    Animated.timing(removeTextOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const hideRemoveText = () => {
    Animated.timing(removeTextOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (breedSearched.length === 1) {
      return showRemoveText();
    }
    if (breedSearched.length === 0) {
      hideRemoveText();
    }
  }, [breedSearched]);

  const selectBreed = (breed: string) => {
    setBreedSelected(breed);
    onButtonPress();
  };

  const cleanField = () => {
    onChangeText('');
    setBreedSearched('');
    hideRemoveText();
  };

  const onButtonPress = () => {
    rotateArrowIcon();
    if (isOpen) {
      fadeOutContent(
        () => setIsOpen(false),
        () => {
          setPaddingBottom(0);
          onClose && onClose();
        },
      );
    } else {
      onOpen && onOpen();
      onChangeText('');
      setBreedSearched('');
      openDropdown(() => {
        setIsOpen(true);
        setPaddingBottom(10);
      });
    }
  };

  return (
    <View style={styles.shadow}>
      <Animated.View
        style={{
          ...styles.buttonContainer,
          height: dropdownHeight,
          paddingBottom: paddingBottom,
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={onButtonPress}
          activeOpacity={0.95}>
          <Text
            style={{
              ...styles.buttonText,
              color: breedSelected ? '#000' : '#757575',
            }}>
            {breedSelected ? breedSelected : 'Selecciona una raza'}
          </Text>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: arrowIconOrientation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-180deg'],
                  }),
                },
              ],
            }}>
            <Icon name="chevron-down-sharp" size={25} color="#757575" />
          </Animated.View>
        </TouchableOpacity>
        {isOpen && (
          <Animated.View
            style={{
              opacity: contentContainerOpacity,
              ...styles.flex1,
            }}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Buscar..."
                style={styles.raceTextInput}
                placeholderTextColor={'#5B5B5B'}
                value={breedSearched}
                autoCorrect={false}
                autoComplete="off"
                onChangeText={text => {
                  setBreedSearched(text);
                  onChangeText(text);
                }}
              />
              <Icon
                name="search"
                size={20}
                color="#5B5B5B"
                style={styles.searchIcon}
              />
              <Animated.View
                style={{
                  ...styles.closeIconContainer,
                  opacity: removeTextOpacity,
                  zIndex: 19,
                }}>
                <TouchableOpacity
                  style={styles.closeIconButton}
                  onPress={cleanField}>
                  <Icon
                    name="close-sharp"
                    size={20}
                    color="#5B5B5B"
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>
              </Animated.View>
            </View>
            <View style={styles.inputSpacer} />
            <FlatList
              data={breedsList}
              keyExtractor={(item, index) => index.toString()}
              style={styles.breedsList}
              renderItem={({item}) => (
                <TouchableOpacity
                  disabled={!isOpen}
                  onPress={() => selectBreed(item)}>
                  <Text style={styles.raceText}>{item}</Text>
                  {item !== breedsList[breedsList.length - 1] && (
                    <View style={styles.raceDivisor} />
                  )}
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#757575',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    borderRadius: 15,
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 25,
    overflow: 'hidden',
    minHeight: 65,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    maxHeight: 65,
    borderRadius: 15,
    width: '100%',
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#757575',
  },
  flex1: {
    flex: 1,
  },
  inputContainer: {
    justifyContent: 'center',
  },
  inputSpacer: {
    height: 10,
    backgroundColor: 'white',
  },
  raceTextInput: {
    borderColor: '#A5A5A5',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 50,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 20,
  },
  closeIconButton: {
    padding: 5,
  },
  closeIconContainer: {
    position: 'absolute',
    right: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  closeIcon: {},
  breedsList: {
    height: '100%',
  },
  raceText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    paddingVertical: 15,
  },
  raceDivisor: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E5E5',
  },
});
