import {useRef} from 'react';
import {Animated} from 'react-native';

export const useAnimation = () => {
  const textPosition = useRef(new Animated.Value(0)).current;
  const loaderPosition = useRef(new Animated.Value(50)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const loaderOpacity = useRef(new Animated.Value(0)).current;

  const moveTextUP = (initPosition: number, duration: number = 200) => {
    Animated.timing(textPosition, {
      toValue: initPosition,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const moveLoaderUP = (initPosition: number, duration: number = 200) => {
    Animated.timing(loaderPosition, {
      toValue: initPosition,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOutButtonText = () => {
    Animated.timing(textOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeInLoader = () => {
    Animated.timing(loaderOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return {
    textPosition,
    textOpacity,
    loaderOpacity,
    loaderPosition,
    moveTextUP,
    fadeOutButtonText,
    fadeInLoader,
    moveLoaderUP,
  };
};
