import {useRef} from 'react';
import {Animated, Dimensions} from 'react-native';
const {width: screenWidth} = Dimensions.get('window');

export const useAnimation = () => {
  const textPosition = useRef(new Animated.Value(0)).current;
  const loaderPosition = useRef(new Animated.Value(50)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const loaderOpacity = useRef(new Animated.Value(0)).current;
  const contentPosition = useRef(new Animated.Value(0)).current;
  const leftContentOpacity = useRef(new Animated.Value(1)).current;
  const rightContentOpacity = useRef(new Animated.Value(0)).current;

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

  const moveContentLeft = () => {
    Animated.timing(contentPosition, {
      toValue: -screenWidth,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const moveContentRight = () => {
    Animated.timing(contentPosition, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const hideLeftContent = () => {
    Animated.timing(leftContentOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const showRightContent = () => {
    Animated.timing(rightContentOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const hideRightContent = () => {
    Animated.timing(rightContentOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const showLeftContent = () => {
    Animated.timing(leftContentOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return {
    textPosition,
    textOpacity,
    loaderOpacity,
    loaderPosition,
    contentPosition,
    leftContentOpacity,
    rightContentOpacity,
    moveTextUP,
    fadeOutButtonText,
    fadeInLoader,
    moveLoaderUP,
    moveContentLeft,
    moveContentRight,
    hideLeftContent,
    showRightContent,
    hideRightContent,
    showLeftContent,
  };
};
