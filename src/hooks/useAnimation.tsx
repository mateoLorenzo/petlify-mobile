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

  const stepOneWidth = useRef(new Animated.Value(screenWidth * 0.3)).current;
  const stepTwoWidth = useRef(new Animated.Value(screenWidth * 0.1)).current;
  const stepThreeWidth = useRef(new Animated.Value(screenWidth * 0.1)).current;
  const stepFourWidth = useRef(new Animated.Value(screenWidth * 0.1)).current;
  const stepFiveWidth = useRef(new Animated.Value(screenWidth * 0.1)).current;
  const stepSixWidth = useRef(new Animated.Value(screenWidth * 0.1)).current;
  const dogBorderOpacity = useRef(new Animated.Value(0)).current;
  const catBorderOpacity = useRef(new Animated.Value(0)).current;
  const maleBorderOpacity = useRef(new Animated.Value(0)).current;
  const femaleBorderOpacity = useRef(new Animated.Value(0)).current;
  const petContentPosition = useRef(new Animated.Value(0)).current;

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

  const getStepWidth = (stepIndex: number) => {
    if (stepIndex === 1) {
      return stepOneWidth;
    }
    if (stepIndex === 2) {
      return stepTwoWidth;
    }
    if (stepIndex === 3) {
      return stepThreeWidth;
    }
    if (stepIndex === 4) {
      return stepFourWidth;
    }
    if (stepIndex === 5) {
      return stepFiveWidth;
    }
    return stepSixWidth;
  };

  const reduceStepWidth = (stepIndex: number) => {
    const stepToUpdate = getStepWidth(stepIndex);
    Animated.timing(stepToUpdate, {
      toValue: screenWidth * 0.1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const expandStepWidth = (stepIndex: number) => {
    const stepToUpdate = getStepWidth(stepIndex);
    Animated.timing(stepToUpdate, {
      toValue: screenWidth * 0.3,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const getBorderToUpdate = (border: 'dog' | 'cat' | 'male' | 'female') => {
    if (border === 'dog') {
      return dogBorderOpacity;
    }
    if (border === 'cat') {
      return catBorderOpacity;
    }
    if (border === 'male') {
      return maleBorderOpacity;
    }
    return femaleBorderOpacity;
  };

  const showBorder = (border: 'dog' | 'cat' | 'male' | 'female') => {
    const borderToUpdate = getBorderToUpdate(border);
    Animated.timing(borderToUpdate, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const hideBorder = (border: 'dog' | 'cat' | 'male' | 'female') => {
    const borderToUpdate = getBorderToUpdate(border);
    Animated.timing(borderToUpdate, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const movePetContentLeft = (contentActualPosition: number) => {
    Animated.timing(petContentPosition, {
      toValue: contentActualPosition - screenWidth,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const movePetContentRight = (contentActualPosition: number) => {
    Animated.timing(petContentPosition, {
      toValue: contentActualPosition + screenWidth,
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
    stepOneWidth,
    stepTwoWidth,
    stepThreeWidth,
    stepFourWidth,
    stepFiveWidth,
    stepSixWidth,
    dogBorderOpacity,
    catBorderOpacity,
    maleBorderOpacity,
    femaleBorderOpacity,
    petContentPosition,

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
    getStepWidth,
    reduceStepWidth,
    expandStepWidth,
    showBorder,
    hideBorder,
    movePetContentLeft,
    movePetContentRight,
  };
};
