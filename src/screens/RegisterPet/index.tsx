/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  ImageSourcePropType,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useAnimation} from '../../hooks/useAnimation';
import {Controller, useForm} from 'react-hook-form';
import {AgePicker} from '../../components/AgePicker';
import {styles} from './styles';
import {CustomDropdown} from '../../components/CustomDropdown';
import {dogBreeds} from '../../constants';
const dogImage = require('../../../assets/images/dog.png');
const catImage = require('../../../assets/images/cat.png');
const maleImage = require('../../../assets/images/male.png');
const femaleImage = require('../../../assets/images/female.png');
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Pet} from '../../interfaces';
import {supabase} from '../../lib/supabase';

const steps = [1, 2, 3, 4, 5, 6];
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
  name: string;
  type: 'dog' | 'cat' | null;
  gender: 'male' | 'female' | undefined;
  breed: string;
  years: string;
  months: string;
  size: 'small' | 'medium' | 'large' | undefined;
  image: string | ImageSourcePropType;
}

const initialPetData: PetData = {
  name: '',
  type: null,
  gender: undefined,
  size: undefined,
  breed: '',
  years: '1',
  months: '1',
  image: '/',
};

const RegisterPetScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [uncompletedSteps, setUncompletedSteps] = useState([2, 3, 4, 5, 6]);
  const [contentActualPosition, setContentActualPosition] = useState(0);
  const [petInfo, setPetInfo] = useState<PetData>(initialPetData);
  const [continueButtonColor, setContinueButtonColor] = useState('gray');
  const [breedsList, setBreedsList] = useState(dogBreeds);
  const [loading, setLoading] = useState(true);

  const nameInputRef = useRef<TextInput>(null);
  const dropdownPaddingTop = useRef(new Animated.Value(60)).current;
  const {control} = useForm();
  const {navigate, goBack} = useNavigation();

  const {
    showBorder,
    hideBorder,
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

  const reduceDropdownPadding = () => {
    Animated.timing(dropdownPaddingTop, {
      toValue: 20,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const expandDropdownPadding = () => {
    Animated.timing(dropdownPaddingTop, {
      toValue: 60,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const getStepColor = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) {
      return '#1E96FF';
    }
    if (currentStep === stepIndex) {
      return '#1E96FF';
    }
    return 'white';
  };

  const onChangeText = (text: string) => {
    setBreedsList(
      dogBreeds.filter((breed: string) =>
        breed.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  const antiCorruptionLayer = (petData: Pet) => {
    console.log('inside anti corruption', petData);
    setPetInfo({
      name: petData.name,
      type: petData.type,
      gender: petData.gender,
      breed: petData.breed || '',
      years: petData.years?.toString() || '0',
      months: petData.months?.toString() || '0',
      image: petData.image,
      size: petData.size,
    });
  };

  const getPet = async () => {
    const lucyID = '93635bd0-3321-4d55-a638-2046310dc29c';
    const {data} = await supabase
      .from('pets')
      .select('*')
      .eq('id', lucyID)
      .single();

    console.log('data from getPet', data);
    antiCorruptionLayer(data);
    setLoading(false);
  };

  useEffect(() => {
    // TODO: Receive pet from params
    getPet();
  }, []);

  useEffect(() => {
    if (petInfo.type === 'dog') {
      showBorder('dog');
      hideBorder('cat');
    }
    if (petInfo.type === 'cat') {
      showBorder('cat');
      hideBorder('dog');
    }
    if (petInfo.gender === 'male') {
      showBorder('male');
      hideBorder('female');
    }
    if (petInfo.gender === 'female') {
      showBorder('female');
      hideBorder('male');
    }
  }, [petInfo.type, petInfo.gender]);

  const updatePetType = (type: 'dog' | 'cat') => {
    setPetInfo({...petInfo, type: type});
  };

  const updateGender = (gender: 'male' | 'female') => {
    setPetInfo({...petInfo, gender: gender});
  };

  useEffect(() => {
    if (currentStep === 1) {
      focusInput();
    }
    if (currentStep === 1 && petInfo.name.length) {
      setContinueButtonColor('#1E96FF');
    } else if (currentStep === 2 && petInfo.type !== undefined) {
      setContinueButtonColor('#1E96FF');
    } else if (currentStep === 3 && petInfo.gender !== undefined) {
      setContinueButtonColor('#1E96FF');
    } else if (currentStep === 4 && petInfo.breed.length > 0) {
      setContinueButtonColor('#1E96FF');
    } else if (currentStep === 5) {
      setContinueButtonColor('#1E96FF');
    } else if (currentStep === 6) {
      setContinueButtonColor('#1E96FF');
    } else {
      setContinueButtonColor('gray');
    }
  }, [currentStep, petInfo]);

  const choosePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPetInfo({...petInfo, image: image.path});
    });
  };

  const savePetToSupabase = async (pet: Pet) => {
    try {
      const lucyID = '93635bd0-3321-4d55-a638-2046310dc29c';
      const {data, error} = await supabase
        .from('pets')
        .update(pet)
        .eq('id', lucyID);
      console.log('data', data);

      if (error) {
        console.error('Error inserting pet:', error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error saving pet:', error);
      return false;
    }
  };

  const formatDataForSupabase = (petData: PetData): Pet => {
    return {
      name: petData.name,
      years: parseInt(petData.years, 10),
      months: parseInt(petData.months, 10),
      image: petData.image as ImageSourcePropType,
      type: petData.type,
      breed: petData.breed,
      size: petData.size,
      gender: petData.gender,
    };
  };

  const onPressContinue = async () => {
    if (currentStep === 1 && !petInfo.name?.length) {
      return;
    }
    if (currentStep === 2 && petInfo.type === undefined) {
      return;
    }
    if (currentStep === 3 && petInfo.gender === undefined) {
      return;
    }
    if (currentStep === 4 && petInfo.breed.length === 0) {
      return;
    }
    if (currentStep === 6) {
      await savePetToSupabase(formatDataForSupabase(petInfo));
      return navigate('BottomTabNavigator' as never);
    }
    if (currentStep === 1 && petInfo.name.length > 0) {
      Keyboard.dismiss();
    }
    savePetToSupabase(formatDataForSupabase(petInfo));
    setCompletedSteps([...completedSteps, currentStep]);
    setUncompletedSteps(uncompletedSteps.filter(step => step !== currentStep));
    movePetContentLeft(contentActualPosition);
    setContentActualPosition(contentActualPosition - screenWidth);
    setCurrentStep(currentStep + 1);
  };

  const onPressBack = () => {
    if (currentStep === 1) {
      return goBack();
    }
    if (currentStep === 2) {
      focusInput();
    }
    setCompletedSteps(completedSteps.filter(step => step !== currentStep));
    setUncompletedSteps([...uncompletedSteps, currentStep]);
    setCurrentStep(currentStep - 1);
    movePetContentRight(contentActualPosition);
    setContentActualPosition(contentActualPosition + screenWidth);
  };

  const onChangeName = (text: string) => {
    setPetInfo({...petInfo, name: text});
  };

  const onChangeBreed = (breed: string) => {
    setPetInfo({...petInfo, breed: breed});
  };

  const onChangeYear = (newYear: string) => {
    setPetInfo({...petInfo, years: newYear});
  };

  const onChangeMonth = (newMonth: string) => {
    setPetInfo({...petInfo, months: newMonth});
  };

  return (
    <SafeAreaView style={{...styles.screenContainer}}>
      <KeyboardAvoidingView
        style={styles.flex1}
        enabled={currentStep !== 4}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
        behavior={'padding'}>
        <DismissKeyboard>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={onPressBack}>
            <Icon name="arrow-back" size={25} color="#000" />
          </TouchableOpacity>

          <View style={styles.stepperContainer}>
            {steps.map((step, index) => (
              <View
                style={{
                  ...styles.stepperItem,
                  backgroundColor: getStepColor(step),
                }}
                key={index}
              />
            ))}
          </View>

          <Text style={styles.title}>¡Registremos Tu Mascota!</Text>

          <Animated.View
            style={{
              ...styles.sectionsContainer,
              transform: [{translateX: petContentPosition}],
              height: currentStep === 1 ? 250 : 'auto',
            }}>
            <View style={styles.nameSectionContainer}>
              <Text style={styles.subtitle}>¿Cómo se llama tu mascota?</Text>
              {loading === true ? (
                <ActivityIndicator
                  style={{marginTop: 130}}
                  size="small"
                  color="#1E96FF"
                />
              ) : (
                <Controller
                  name="petName"
                  rules={{required: 'Ingresa el nombre de tu mascota'}}
                  control={control}
                  render={() => (
                    <TextInput
                      ref={nameInputRef}
                      value={petInfo.name}
                      autoCorrect={false}
                      placeholderTextColor={'lightgray'}
                      placeholder="Lucy"
                      autoComplete="off"
                      spellCheck={false}
                      style={styles.nameInput}
                      onChangeText={onChangeName}
                    />
                  )}
                />
              )}
            </View>

            <View style={styles.typeSectionContainer}>
              <Text style={styles.subtitle}>
                ¿A qué especie pertenece {petInfo.name}?
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
                ¿A qué genero pertenece {petInfo.name}?
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
              <Text style={styles.raceSubtitle}>
                ¿A que raza pertenece {petInfo.name}?
              </Text>
              <Animated.View
                style={{
                  ...styles.dropdownContainer,
                  paddingTop: dropdownPaddingTop,
                }}>
                <CustomDropdown
                  onChangeText={onChangeText}
                  breedSelected={petInfo.breed}
                  setBreedSelected={onChangeBreed}
                  breedsList={breedsList}
                  onOpen={reduceDropdownPadding}
                  onClose={expandDropdownPadding}
                />
              </Animated.View>
            </View>

            <View style={styles.ageSectionContainer}>
              <Text style={styles.subtitle}>
                ¿Cuantos años tiene {petInfo.name}?
              </Text>
              <View>
                <View style={styles.agePickerContainer}>
                  <View style={styles.ageContainer}>
                    <Text style={styles.ageNumber}>{petInfo.years}</Text>
                    <Text style={styles.ageText}>Años</Text>
                  </View>
                  <View style={styles.ageContainer}>
                    <Text style={styles.ageNumber}>{petInfo.months}</Text>
                    <Text style={styles.ageText}>Meses</Text>
                  </View>
                </View>
                <AgePicker
                  yearSelected={petInfo.years}
                  monthSelected={petInfo.months}
                  setYearSelected={onChangeYear}
                  setMonthSelected={onChangeMonth}
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
                  {petInfo.image === initialImage ? (
                    <Icon name="add-outline" size={50} color="#1E96FF" />
                  ) : (
                    <Image
                      source={{uri: petInfo.image as string}}
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
              style={{
                ...styles.continueButton,
                backgroundColor: continueButtonColor,
              }}
              onPress={onPressContinue}>
              <Icon name="arrow-forward" size={25} color="#FFF" />
            </TouchableOpacity>
          </View>
        </DismissKeyboard>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default RegisterPetScreen;
