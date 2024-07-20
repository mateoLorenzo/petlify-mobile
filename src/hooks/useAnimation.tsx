import {useRef} from 'react';
import {Animated, Dimensions} from 'react-native';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

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
  const smallSizeBorderOpacity = useRef(new Animated.Value(0)).current;
  const mediumSizeBorderOpacity = useRef(new Animated.Value(0)).current;
  const largeSizeBorderOpacity = useRef(new Animated.Value(0)).current;
  const extraLargeSizeBorderOpacity = useRef(new Animated.Value(0)).current;
  const petContentPosition = useRef(new Animated.Value(0)).current;

  const arrowIconOrientation = useRef(new Animated.Value(0)).current;
  const dropdownHeight = useRef(new Animated.Value(65)).current;
  const contentContainerOpacity = useRef(new Animated.Value(0)).current;

  const servicesPosition = useRef(
    new Animated.Value(screenHeight * -1),
  ).current;
  const walkersPosition = useRef(new Animated.Value(0)).current;
  const buttonPosition = useRef(new Animated.Value(0)).current;

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

  const getSizeBorderToUpdate = (
    size: 'small' | 'medium' | 'large' | 'extra_large',
  ) => {
    if (size === 'small') {
      return smallSizeBorderOpacity;
    }
    if (size === 'medium') {
      return mediumSizeBorderOpacity;
    }
    if (size === 'large') {
      return largeSizeBorderOpacity;
    }
    return extraLargeSizeBorderOpacity;
  };

  const updateSizeBorder = (
    size: 'small' | 'medium' | 'large' | 'extra_large',
    action: 'show' | 'hide',
  ) => {
    const borderToUpdate = getSizeBorderToUpdate(size);
    Animated.timing(borderToUpdate, {
      toValue: action === 'show' ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const movePetContentLeft = (contentActualPosition: number) => {
    Animated.timing(petContentPosition, {
      toValue: contentActualPosition - screenWidth,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const movePetContentRight = (contentActualPosition: number) => {
    Animated.timing(petContentPosition, {
      toValue: contentActualPosition + screenWidth,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const rotateArrowIcon = () => {
    const arrowOrientation = Number(JSON.stringify(arrowIconOrientation));
    Animated.timing(arrowIconOrientation, {
      toValue: arrowOrientation === 0 ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const openDropdown = (afterOpen: () => void) => {
    Animated.timing(dropdownHeight, {
      toValue: 450,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      afterOpen();
      fadeInContent();
    });
  };

  const closeDropdown = (afterClose: () => void) => {
    Animated.timing(dropdownHeight, {
      toValue: 65,
      duration: 300,
      useNativeDriver: false,
    }).start(afterClose);
  };

  const fadeInContent = () => {
    Animated.timing(contentContainerOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const fadeOutContent = (
    afterClose: () => void,
    changePadding: () => void,
  ) => {
    Animated.timing(contentContainerOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      changePadding();
      closeDropdown(afterClose);
    });
  };

  const moveButton = (areWalkersShown: boolean) => {
    Animated.timing(buttonPosition, {
      toValue: areWalkersShown ? screenHeight * 0.8 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const moveWalkersContainer = (areWalkersShown: boolean) => {
    Animated.timing(walkersPosition, {
      toValue: areWalkersShown ? screenHeight * 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const moveServicesContainer = (areWalkersShown: boolean) => {
    Animated.timing(servicesPosition, {
      toValue: areWalkersShown ? 0 : screenHeight * -1,
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
    smallSizeBorderOpacity,
    mediumSizeBorderOpacity,
    largeSizeBorderOpacity,
    extraLargeSizeBorderOpacity,
    petContentPosition,
    arrowIconOrientation,
    dropdownHeight,
    contentContainerOpacity,
    servicesPosition,
    buttonPosition,
    walkersPosition,

    moveButton,
    moveWalkersContainer,
    moveServicesContainer,
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
    showBorder,
    hideBorder,
    updateSizeBorder,
    movePetContentLeft,
    movePetContentRight,
    rotateArrowIcon,
    openDropdown,
    closeDropdown,
    fadeInContent,
    fadeOutContent,
  };
};
