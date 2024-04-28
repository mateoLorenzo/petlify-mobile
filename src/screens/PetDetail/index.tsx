import React, {useRef, useState} from 'react';
import {
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Logo from '../../../assets/images/logo.svg';
const dogImage = require('../../../assets/images/dog.png');
const catImage = require('../../../assets/images/cat.png');
const rightArrow = require('../../../assets/images/right-arrow.png');
const maleImage = require('../../../assets/images/male.png');
const femaleImage = require('../../../assets/images/female.png');
const addIcon = require('../../../assets/images/add.png');
const steps = [1, 2, 3, 4, 5, 6];

const DismissKeyboard = ({children}: {children: React.ReactNode}) => (
  <TouchableOpacity
    activeOpacity={1}
    style={styles.container}
    onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableOpacity>
);

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
  const nameInputRef = useRef<TextInput>(null);

  const focusInput = () => {
    // Hacer focus en el input al presionar el botón
    nameInputRef.current?.focus();
  };

  const getStepColor = (stepIndex: number) => {
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
    if (currentStep === 1) {
      Keyboard.dismiss();
    }
    setCompletedSteps([...completedSteps, currentStep]);
    setUncompletedSteps(uncompletedSteps.filter(step => step !== currentStep));
    reduceStepWidth(currentStep);
    expandStepWidth(currentStep + 1);
    setCurrentStep(currentStep + 1);
    moveContentLeft();
    hideBorder('left');
    hideBorder('right');
  };

  const onPressBack = () => {
    if (currentStep === 1) {
      return;
    }
    if (currentStep === 2) {
      focusInput();
    }
    setCompletedSteps(completedSteps.filter(step => step !== currentStep));
    setUncompletedSteps([...uncompletedSteps, currentStep]);
    reduceStepWidth(currentStep);
    expandStepWidth(currentStep - 1);
    setCurrentStep(currentStep - 1);
    moveContentRight();
    hideBorder('left');
    hideBorder('right');
  };

  return (
    <SafeAreaView style={{...styles.screenContainer, marginTop: top}}>
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <DismissKeyboard>
          <StatusBar barStyle={'dark-content'} />
          <Logo height={70} width={70} style={styles.logo} />
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

          <Text style={styles.title}>¡Registremos Tu Mascota!</Text>
          <Animated.View
            style={{
              ...styles.petBoxesContainer,
              transform: [{translateX: contentPosition}],
            }}>
            <View style={styles.nameSectionContainer}>
              <Text style={styles.subtitle}>¿Cómo se llama tu mascota?</Text>
              <TextInput
                ref={nameInputRef}
                autoCorrect={false}
                placeholder="Lucy"
                autoComplete="off"
                spellCheck={false}
                style={styles.nameInput}
              />
            </View>

            <View style={styles.kindSectionContainer}>
              <Text style={styles.subtitle}>¿A qué especie pertenece?</Text>
              <View style={[styles.petTypeContainer, styles.shadow]}>
                <TouchableOpacity
                  activeOpacity={0.3}
                  style={styles.petTypeBox}
                  onPress={onDogPress}>
                  <Image source={dogImage} style={styles.dogImage} />
                  <Text style={styles.petTypeText}>Perro</Text>
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
                  <Text style={styles.petTypeText}>Gato</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.genderSectionContainer}>
              <Text style={styles.subtitle}>¿A qué genero pertenece?</Text>

              <View style={[styles.petTypeContainer, styles.shadow]}>
                <TouchableOpacity
                  activeOpacity={0.3}
                  style={styles.petTypeBox}
                  onPress={onDogPress}>
                  <Image source={maleImage} />
                  <Text style={styles.petTypeText}>Macho</Text>
                </TouchableOpacity>
                <Animated.View
                  style={{
                    ...styles.customBorder,
                    opacity: borderLeftOpacity,
                  }}
                />
              </View>
              <View style={[styles.petTypeContainer, styles.shadow]}>
                <TouchableOpacity
                  activeOpacity={0.3}
                  style={styles.petTypeBox}
                  onPress={onCatPress}>
                  <Image source={femaleImage} />
                  <Text style={styles.petTypeText}>Hembra</Text>
                </TouchableOpacity>
                <Animated.View
                  style={{
                    ...styles.customBorder,
                    opacity: borderRightOpacity,
                  }}
                />
              </View>
            </View>

            <View style={styles.raceSectionContainer}>
              <Text style={styles.subtitle}>¿A qué raza pertenece?</Text>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.selectRaceButton}>
                <Text style={styles.selectRaceText}>Selecciona una raza</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.ageSectionContainer}>
              <Text style={styles.subtitle}>¿Cuantos años tiene?</Text>
              <TouchableOpacity activeOpacity={0.5} style={styles.ageContainer}>
                <Text style={styles.ageNumber}>0</Text>
                <Text style={styles.ageText}>Años</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} style={styles.ageContainer}>
                <Text style={styles.ageNumber}>0</Text>
                <Text style={styles.ageText}>Meses</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.photoSectionContainer}>
              <View style={[styles.addImageContainer, styles.addImageShadow]}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.addImageCircle}>
                  <Image source={addIcon} style={styles.addImageIcon} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity activeOpacity={0.5}>
                <Text style={styles.addImageText}>Cargar foto</Text>
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
        </DismissKeyboard>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  flex1: {
    flex: 1,
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
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 26,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    position: 'absolute',
    top: 0,
  },
  petBoxesContainer: {
    flexDirection: 'row',
    height: 250,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  kindSectionContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  petTypeContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 8,
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
  petTypeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginTop: 10,
  },
  dogImage: {
    width: 90,
    height: 90,
  },
  catImage: {
    width: 75,
    height: 75,
  },
  sectionContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  raceSectionContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectRaceButton: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#1E96FF',
    borderRadius: 15,
  },
  selectRaceText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1E96FF',
  },
  genderSectionContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  ageSectionContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ageContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  ageNumber: {
    fontFamily: 'Poppins-Medium',
    fontSize: 50,
    color: '#1E96FF',
  },
  ageText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#000',
  },
  nameSectionContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameInput: {
    fontSize: 40,
    fontFamily: 'Poppins-Medium',
  },
  photoSectionContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  addImageContainer: {
    borderRadius: 100,
    width: 150,
    height: 150,
    backgroundColor: 'white',
  },
  addImageShadow: {
    shadowColor: '#1E96FF',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  addImageCircle: {
    height: '100%',
    borderWidth: 2,
    borderColor: '#1E96FF',
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  addImageIcon: {
    width: 60,
    height: 60,
  },
  addImageText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#1E96FF',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
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
    // backgroundColor: 'red',
    marginBottom: 60,
  },
  continueButton: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#1E96FF',
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  backButton: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#1E96FF',
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  backButtonText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },
});
export default PetDetailScreen;
