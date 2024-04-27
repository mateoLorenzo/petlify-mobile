import React, {useRef, useState} from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import TitleSubtitle from '../../components/TitleSubtitle';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Logo from '../../../assets/images/logo.svg';
const dogImage = require('../../../assets/images/dog.png');
const catImage = require('../../../assets/images/cat.png');
const rightArrow = require('../../../assets/images/right-arrow.png');
const steps = [1, 2, 3, 4, 5, 6];

const PetDetailScreen = () => {
  const {top} = useSafeAreaInsets();
  const {width: screenWidth} = useWindowDimensions();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [uncompletedSteps, setUncompletedSteps] = useState([2, 3, 4, 5, 6]);

  const stepOneWidth = useRef(new Animated.Value(screenWidth * 0.3)).current;
  const stepTwoWidth = useRef(new Animated.Value(screenWidth * 0.1)).current;
  const stepThreeWidth = useRef(new Animated.Value(screenWidth * 0.1)).current;
  const stepFourWidth = useRef(new Animated.Value(screenWidth * 0.1)).current;
  const stepFiveWidth = useRef(new Animated.Value(screenWidth * 0.1)).current;
  const stepSixWidth = useRef(new Animated.Value(screenWidth * 0.1)).current;
  const borderLeftOpacity = useRef(new Animated.Value(0)).current;
  const borderRightOpacity = useRef(new Animated.Value(0)).current;
  const contentPosition = useRef(new Animated.Value(0)).current;
  const [contentActualPosition, setContentActualPosition] = useState(0);

  const getStepColor = (stepIndex: number) => {
    console.log('getStepColor', stepIndex, currentStep, completedSteps);
    if (completedSteps.includes(stepIndex)) {
      return '#1E96FF';
    }
    if (currentStep === stepIndex) {
      return '#1E96FF';
    }
    return '#000';
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

  const showBorder = (border: 'left' | 'right') => {
    const borderToUpdate =
      border === 'left' ? borderLeftOpacity : borderRightOpacity;
    Animated.timing(borderToUpdate, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const hideBorder = (border: 'left' | 'right') => {
    const borderToUpdate =
      border === 'left' ? borderLeftOpacity : borderRightOpacity;
    Animated.timing(borderToUpdate, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const moveContentLeft = () => {
    setContentActualPosition(contentActualPosition - screenWidth);
    Animated.timing(contentPosition, {
      toValue: contentActualPosition - screenWidth,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const moveContentRight = () => {
    setContentActualPosition(contentActualPosition + screenWidth);
    Animated.timing(contentPosition, {
      toValue: contentActualPosition + screenWidth,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const onDogPress = () => {
    showBorder('left');
    hideBorder('right');
  };

  const onCatPress = () => {
    showBorder('right');
    hideBorder('left');
  };

  const onPressContinue = () => {
    if (currentStep === 6) {
      return;
    }
    setCompletedSteps([...completedSteps, currentStep]);
    setUncompletedSteps(uncompletedSteps.filter(step => step !== currentStep));
    reduceStepWidth(currentStep);
    expandStepWidth(currentStep + 1);
    setCurrentStep(currentStep + 1);
    moveContentLeft();
  };

  const onPressBack = () => {
    if (currentStep === 1) {
      return;
    }
    setCompletedSteps(completedSteps.filter(step => step !== currentStep));
    setUncompletedSteps([...uncompletedSteps, currentStep]);
    reduceStepWidth(currentStep);
    expandStepWidth(currentStep - 1);
    setCurrentStep(currentStep - 1);
    moveContentRight();
  };

  return (
    <SafeAreaView style={{...styles.screenContainer, marginTop: top}}>
      <StatusBar barStyle={'dark-content'} />
      <Logo height={100} width={100} style={styles.logo} />
      <View style={styles.stepsContainer}>
        {steps.map(step => (
          <Animated.View
            style={{
              ...styles.stepBar,
              backgroundColor: getStepColor(step),
              width: getStepWidth(step),
            }}
            key={step}
          />
        ))}
      </View>
      <TitleSubtitle
        title="¡Registremos Tu Mascota!"
        subtitle="¿A qué especie pertenece?"
      />
      <Animated.View
        style={{
          ...styles.petBoxesContainer,
          transform: [{translateX: contentPosition}],
        }}>
        <View style={[styles.petTypeContainer, styles.shadow]}>
          <TouchableOpacity
            activeOpacity={0.3}
            style={styles.petTypeBox}
            onPress={onDogPress}>
            <Image source={dogImage} style={styles.dogImage} />
          </TouchableOpacity>
          <Animated.View
            style={{
              ...styles.customBorder,
              opacity: borderLeftOpacity,
            }}
          />
        </View>
        <View style={[styles.petTypeContainer, styles.shadow]}>
          <Animated.View
            style={{
              ...styles.customBorder,
              opacity: borderRightOpacity,
            }}
          />
          <TouchableOpacity
            activeOpacity={0.3}
            style={styles.petTypeBox}
            onPress={onCatPress}>
            <Image source={catImage} style={styles.catImage} />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <View style={styles.spacer} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.backButton}
          onPress={onPressBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.continueButton}
          onPress={onPressContinue}>
          <Image source={rightArrow} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    marginTop: 20,
  },
  stepsContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 15,
  },
  stepBar: {
    height: 4,
    borderRadius: 1,
    backgroundColor: '#000',
  },
  petBoxesContainer: {
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'space-between',
  },
  petTypeContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 8,
    justifyContent: 'center',
    width: 170,
    height: 170,
  },
  customBorder: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#1E96FF',
  },
  petTypeBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    zIndex: 5,
    height: '100%',
  },
  dogImage: {
    width: 90,
    height: 90,
  },
  catImage: {
    width: 75,
    height: 75,
  },
  spacer: {
    flex: 1,
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.20)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  continueButton: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#1E96FF',
    borderRadius: 4,
    marginBottom: 50,
    alignSelf: 'flex-end',
  },
  backButton: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#1E96FF',
    borderRadius: 4,
    marginBottom: 50,
    alignSelf: 'flex-end',
  },
  backButtonText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },
});
export default PetDetailScreen;
