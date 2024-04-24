import {useRef} from 'react';
import {Animated, Dimensions} from 'react-native';
const {width: screenWidth} = Dimensions.get('window');

export const useAnimation = () => {
  const textPosition = useRef(new Animated.Value(0)).current;
  const loaderPosition = useRef(new Animated.Value(50)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const loaderOpacity = useRef(new Animated.Value(0)).current;
  const inputPosition = useRef(new Animated.Value(0)).current;
  const confirmPosition = useRef(new Animated.Value(screenWidth)).current;
  const backButtonPosition = useRef(new Animated.Value(-10)).current;
  const confirmButtonWidth = useRef(
    new Animated.Value(screenWidth - 40),
  ).current;
  const firstItemsOpacity = useRef(new Animated.Value(1)).current;
  const secondItemsOpacity = useRef(new Animated.Value(0)).current;

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

  const moveInputLeft = (duration: number = 500) => {
    Animated.timing(inputPosition, {
      toValue: -screenWidth,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const moveInputRight = () => {
    Animated.timing(inputPosition, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const moveConfirmLeft = (duration: number = 500) => {
    Animated.timing(confirmPosition, {
      toValue: -(screenWidth - 40),
      duration,
      useNativeDriver: true,
    }).start();
  };

  const moveConfirmRight = () => {
    Animated.timing(confirmPosition, {
      toValue: 100,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const reduceContinueButtonWidth = (duration: number = 500) => {
    Animated.timing(confirmButtonWidth, {
      toValue: screenWidth - 110,
      duration,
      useNativeDriver: false,
    }).start();
  };
  const expandContinueButtonWidth = (duration: number = 500) => {
    Animated.timing(confirmButtonWidth, {
      toValue: screenWidth - 40,
      duration,
      useNativeDriver: false,
    }).start();
  };

  const showBackButton = (duration: number = 500) => {
    Animated.timing(backButtonPosition, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const hideBackButton = (duration: number = 500) => {
    Animated.timing(backButtonPosition, {
      toValue: -10,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeInSecondItems = (duration: number = 500) => {
    Animated.timing(secondItemsOpacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOutSecondItems = (duration: number = 500) => {
    Animated.timing(secondItemsOpacity, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeInFirstItems = (duration: number = 500) => {
    Animated.timing(firstItemsOpacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOutFirstItems = (duration: number = 500) => {
    Animated.timing(firstItemsOpacity, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  };

  return {
    textPosition,
    textOpacity,
    loaderOpacity,
    loaderPosition,
    inputPosition,
    confirmPosition,
    confirmButtonWidth,
    backButtonPosition,
    firstItemsOpacity,
    secondItemsOpacity,
    moveTextUP,
    fadeOutButtonText,
    fadeInLoader,
    moveLoaderUP,
    moveInputLeft,
    moveInputRight,
    moveConfirmLeft,
    moveConfirmRight,
    reduceContinueButtonWidth,
    expandContinueButtonWidth,
    showBackButton,
    hideBackButton,
    fadeInSecondItems,
    fadeOutSecondItems,
    fadeInFirstItems,
    fadeOutFirstItems,
  };
};
