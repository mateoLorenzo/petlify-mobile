/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Logo from '../../../assets/images/logo.svg';
import {useAnimation} from '../../hooks/useAnimation';
import {Controller, useForm, useWatch} from 'react-hook-form';
import {AgePicker} from '../../components/AgePicker';
import {styles} from './styles';
import {CustomDropdown} from '../../components/CustomDropdown';
import {dogBreeds} from '../../constants';
const dogImage = require('../../../assets/images/dog.png');
const catImage = require('../../../assets/images/cat.png');
const rightArrow = require('../../../assets/images/right-arrow.png');
const maleImage = require('../../../assets/images/male.png');
const femaleImage = require('../../../assets/images/female.png');
const addIcon = require('../../../assets/images/add.png');

// const steps = [1, 2, 3, 4, 5, 6];
const {width: screenWidth} = Dimensions.get('window');
const initialImage =
  'https://cdn.motor1.com/images/mgl/BbKZZ/s3/2019-aston-martin-dbs-superleggera.jpg';

const DismissKeyboard = ({children}: {children: React.ReactNode}) => (
  <TouchableOpacity
    activeOpacity={1}
    style={styles.container}
    onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableOpacity>
);

interface PetData {
  petName: string;
  petType: 'dog' | 'cat' | undefined;
  petGender: 'male' | 'female' | undefined;
  petRace: string;
  petAge: {
    years: number;
    months: number;
  };
  petPhoto: string;
}

const initialPetData: PetData = {
  petName: '',
  petType: undefined,
  petGender: undefined,
  petRace: '',
  petAge: {
    years: 0,
    months: 0,
  },
  petPhoto: '',
};

const PetDetailScreen = () => {
  const {top} = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [uncompletedSteps, setUncompletedSteps] = useState([2, 3, 4, 5, 6]);
  const [contentActualPosition, setContentActualPosition] = useState(0);
  const [petInfo, setPetInfo] = useState<PetData>(initialPetData);
  const [continueButtonColor, setContinueButtonColor] = useState('gray');
  const [yearSelected, setYearSelected] = useState('0');
  const [monthSelected, setMonthSelected] = useState('1');
  const [selectedImage, setSelectedImage] = useState(initialImage);
  const [breedSelected, setBreedSelected] = useState('');
  const nameInputRef = useRef<TextInput>(null);
  const {control} = useForm();
  const petName = useWatch({control, name: 'petName'});

  const {
    showBorder,
    hideBorder,
    // getStepWidth,
    reduceStepWidth,
    expandStepWidth,
    movePetContentLeft,
    movePetContentRight,
    maleBorderOpacity,
    femaleBorderOpacity,
    petContentPosition,
    dogBorderOpacity,
    catBorderOpacity,
  } = useAnimation();

  const focusInput = () => {
    nameInputRef.current?.focus();
  };

  // const getStepColor = (stepIndex: number) => {
  //   if (completedSteps.includes(stepIndex)) {
  //     return '#1E96FF';
  //   }
  //   if (currentStep === stepIndex) {
  //     return '#1E96FF';
  //   }
  //   return '#000';
  // };

  useEffect(() => {
    if (petInfo.petType === 'dog') {
      showBorder('dog');
      hideBorder('cat');
    }
    if (petInfo.petType === 'cat') {
      showBorder('cat');
      hideBorder('dog');
    }
    if (petInfo.petGender === 'male') {
      showBorder('male');
      hideBorder('female');
    }
    if (petInfo.petGender === 'female') {
      showBorder('female');
      hideBorder('male');
    }
  }, [petInfo.petType, petInfo.petGender]);

  const updatePetType = (type: 'dog' | 'cat') => {
    setPetInfo({...petInfo, petType: type});
  };

  const updateGender = (gender: 'male' | 'female') => {
    setPetInfo({...petInfo, petGender: gender});
  };

  useEffect(() => {
    if (currentStep === 1) {
      focusInput();
    }
    if (currentStep === 1 && petName?.length) {
      setContinueButtonColor('#1E96FF');
    } else if (currentStep === 2 && petInfo.petType !== undefined) {
      setContinueButtonColor('#1E96FF');
    } else if (currentStep === 3 && petInfo.petGender !== undefined) {
      setContinueButtonColor('#1E96FF');
    } else if (currentStep === 4 && breedSelected.length > 0) {
      setContinueButtonColor('#1E96FF');
    } else if (currentStep === 5) {
      setContinueButtonColor('#1E96FF');
    } else if (currentStep === 6) {
      setContinueButtonColor('#1E96FF');
    } else {
      setContinueButtonColor('gray');
    }
  }, [currentStep, petInfo, petName, breedSelected]);

  const choosePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setSelectedImage(image.path);
    });
  };

  const onPressContinue = () => {
    if (currentStep === 1 && !petName?.length) {
      return;
    }
    if (currentStep === 2 && petInfo.petType === undefined) {
      return;
    }
    if (currentStep === 3 && petInfo.petGender === undefined) {
      return;
    }
    if (currentStep === 4 && breedSelected.length === 0) {
      return;
    }
    if (currentStep === 6) {
      return;
    }
    if (currentStep === 1 && petName?.length > 0) {
      Keyboard.dismiss();
    }
    setCompletedSteps([...completedSteps, currentStep]);
    setUncompletedSteps(uncompletedSteps.filter(step => step !== currentStep));
    reduceStepWidth(currentStep);
    expandStepWidth(currentStep + 1);
    movePetContentLeft(contentActualPosition);
    setContentActualPosition(contentActualPosition - screenWidth);
    setCurrentStep(currentStep + 1);
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
    movePetContentRight(contentActualPosition);
    setContentActualPosition(contentActualPosition + screenWidth);
  };

  return (
    <SafeAreaView style={{...styles.screenContainer, marginTop: top}}>
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <DismissKeyboard>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={'transparent'}
            translucent={true}
          />
          {/* <Logo height={70} width={70} style={styles.logo} /> */}
          {/* <View style={styles.stepsContainer}>
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
          </View> */}
          <Logo height={70} width={70} style={styles.logo} />

          <Text style={styles.title}>¡Registremos Tu Mascota!</Text>

          <Animated.View
            style={{
              ...styles.petBoxesContainer,
              transform: [{translateX: petContentPosition}],
            }}>
            <View style={styles.nameSectionContainer}>
              <Text style={styles.subtitle}>¿Cómo se llama tu mascota?</Text>
              <Controller
                name="petName"
                rules={{required: 'Ingresa el nombre de tu mascota'}}
                control={control}
                render={({field: {value, onChange}}) => (
                  <TextInput
                    ref={nameInputRef}
                    value={value}
                    autoCorrect={false}
                    placeholder="Lucy"
                    autoComplete="off"
                    spellCheck={false}
                    style={styles.nameInput}
                    onChangeText={text => onChange(text)}
                  />
                )}
              />
            </View>

            <View style={styles.kindSectionContainer}>
              <Text style={styles.subtitle}>
                ¿A qué especie pertenece {petName}?
              </Text>
              <View style={[styles.petTypeContainer, styles.shadow]}>
                <TouchableOpacity
                  activeOpacity={0.3}
                  style={styles.petTypeBox}
                  onPress={() => updatePetType('dog')}>
                  <Image source={dogImage} style={styles.dogImage} />
                  <Text style={styles.petTypeText}>Perro</Text>
                </TouchableOpacity>
                <Animated.View
                  style={{
                    ...styles.customBorder,
                    opacity: dogBorderOpacity,
                  }}
                />
              </View>
              <View style={[styles.petTypeContainer, styles.shadow]}>
                <Animated.View
                  style={{
                    ...styles.customBorder,
                    opacity: catBorderOpacity,
                  }}
                />
                <TouchableOpacity
                  activeOpacity={0.3}
                  style={styles.petTypeBox}
                  onPress={() => updatePetType('cat')}>
                  <Image source={catImage} style={styles.catImage} />
                  <Text style={styles.petTypeText}>Gato</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.genderSectionContainer}>
              <Text style={styles.subtitle}>
                ¿A qué genero pertenece {petName}?
              </Text>

              <View style={[styles.petTypeContainer, styles.shadow]}>
                <TouchableOpacity
                  activeOpacity={0.3}
                  style={styles.petTypeBox}
                  onPress={() => updateGender('male')}>
                  <Image source={maleImage} />
                  <Text style={styles.petTypeText}>Macho</Text>
                </TouchableOpacity>
                <Animated.View
                  style={{
                    ...styles.customBorder,
                    opacity: maleBorderOpacity,
                  }}
                />
              </View>
              <View style={[styles.petTypeContainer, styles.shadow]}>
                <TouchableOpacity
                  activeOpacity={0.3}
                  style={styles.petTypeBox}
                  onPress={() => updateGender('female')}>
                  <Image source={femaleImage} />
                  <Text style={styles.petTypeText}>Hembra</Text>
                </TouchableOpacity>
                <Animated.View
                  style={{
                    ...styles.customBorder,
                    opacity: femaleBorderOpacity,
                  }}
                />
              </View>
            </View>

            <View style={styles.raceSectionContainer}>
              <Text style={styles.subtitle}>
                ¿A que raza pertenece {petName}?
              </Text>
              <View style={styles.dropdownContainer}>
                <CustomDropdown
                  breedSelected={breedSelected}
                  setBreedSelected={setBreedSelected}
                  breedsList={dogBreeds}
                />
              </View>
            </View>

            <View style={styles.ageSectionContainer}>
              <Text style={styles.subtitle}>
                ¿Cuantos años tiene {petName}?
              </Text>
              <View>
                <View style={styles.agePickerContainer}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.ageContainer}>
                    <Text style={styles.ageNumber}>{yearSelected}</Text>
                    <Text style={styles.ageText}>Años</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.ageContainer}>
                    <Text style={styles.ageNumber}>{monthSelected}</Text>
                    <Text style={styles.ageText}>Meses</Text>
                  </TouchableOpacity>
                </View>
                <AgePicker
                  yearSelected={yearSelected}
                  monthSelected={monthSelected}
                  setYearSelected={setYearSelected}
                  setMonthSelected={setMonthSelected}
                />
              </View>
            </View>

            <View style={styles.photoSectionContainer}>
              <Text style={styles.subtitle}>
                Por ultimo, ¿Qué tal una imagen?
              </Text>

              <View style={[styles.addImageContainer, styles.addImageShadow]}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.addImageCircle}
                  onPress={choosePhotoFromGallery}>
                  {selectedImage === initialImage ? (
                    <Image source={addIcon} style={styles.addImageIcon} />
                  ) : (
                    <Image
                      source={{uri: selectedImage}}
                      style={styles.petImage}
                      resizeMode="cover"
                    />
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={choosePhotoFromGallery}>
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
              <Text style={styles.backButtonText}>Volver</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.4}
              style={{
                ...styles.continueButton,
                backgroundColor: continueButtonColor,
              }}
              onPress={onPressContinue}>
              <Image source={rightArrow} />
            </TouchableOpacity>
          </View>
        </DismissKeyboard>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default PetDetailScreen;