import React from 'react';
import {TouchableOpacity, StyleSheet, Animated} from 'react-native';
import {CustomSpinner} from '../Spinner';
import {useAnimation} from '../../hooks/useAnimation';

interface Props {
  onPress: () => void;
}

export const CustomButton = ({onPress}: Props) => {
  const {
    textPosition,
    textOpacity,
    loaderOpacity,
    loaderPosition,
    moveTextUP,
    fadeOutButtonText,
    fadeInLoader,
    moveLoaderUP,
  } = useAnimation();

  const moveTextAndShowSpinner = () => {
    moveTextUP(-50);
    fadeOutButtonText();
    fadeInLoader();
    moveLoaderUP(0);
  };

  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      onPress={() => {
        moveTextAndShowSpinner();
        onPress();
      }}>
      <Animated.Text
        style={{
          ...styles.buttonText,
          transform: [{translateY: textPosition}],
          opacity: textOpacity,
        }}>
        Custom Button
      </Animated.Text>
      <Animated.View
        style={{
          opacity: loaderOpacity,
          transform: [{translateY: loaderPosition}],
        }}>
        <CustomSpinner color="white" />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  buttonBackLayer: {
    backgroundColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 70,
    backgroundColor: '#1E96FF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1E96FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    position: 'absolute',
    zIndex: -1,
  },
});
