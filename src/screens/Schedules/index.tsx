/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Logo from '../../../assets/images/logo.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SadDog from '../../../assets/images/sad-dog.svg';
import {CustomButton} from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {schedules as fakeSchedules} from '../../data';
import {ServiceCard} from '../../components/ServiceCard';
const walker = require('../../../assets/images/paseo.png');
const sitter = require('../../../assets/images/cuidado.png');

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const SchedulesScreen = () => {
  const {top: marginTop} = useSafeAreaInsets();
  const navigation = useNavigation();

  const [scheduledWalks, setScheduledWalks] = useState(1);
  const [scheduledCares, setScheduledCares] = useState(0);
  const [servicesShowing, setServicesShowing] = useState<'TODO' | 'DONE'>(
    'TODO',
  );
  const [showBlackLayer, setShowBlackLayer] = useState(false);

  const blackLayerOpacity = useRef(new Animated.Value(0)).current;
  const modalPosition = useRef(new Animated.Value(screenHeight)).current;

  const userHasSchedules = scheduledWalks > 0 && scheduledCares > 0;

  const showLayerAnimation = () => {
    Animated.timing(blackLayerOpacity, {
      toValue: 0.5,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  const hideLayerAnimation = (onFinish?: () => void) => {
    Animated.timing(blackLayerOpacity, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start(onFinish);
  };
  const showModalAnimation = () => {
    Animated.timing(modalPosition, {
      toValue: screenHeight - 360,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const hideModalAnimation = (onFinish?: () => void) => {
    Animated.timing(modalPosition, {
      toValue: screenHeight,
      duration: 400,
      useNativeDriver: true,
    }).start(onFinish);
  };

  const onPressNew = () => {
    setShowBlackLayer(true);
    showLayerAnimation();
    showModalAnimation();
  };

  const hideBlackLayer = () => {
    hideModalAnimation();
    hideLayerAnimation(() => setShowBlackLayer(false));
  };

  const onPressHome = () => {};

  return (
    <View style={styles.container}>
      <Logo height={100} width={100} style={{marginTop}} />
      <Text style={styles.title}>Mis Agendas</Text>
      {userHasSchedules ? (
        <Text style={styles.subtitle}>
          Aqui podrás ver tus servicios agendados y el historial de los que ya
          haz realizado
        </Text>
      ) : (
        <Text style={styles.subtitle}>
          Aqui puedes ver tus servicios agendados
        </Text>
      )}

      {scheduledWalks === 0 && scheduledCares === 0 ? (
        <>
          <SadDog
            height={200}
            width={200}
            fill={'#1E96FF'}
            style={styles.sadDogImage}
          />
          <Text style={styles.noSchedulesTitle}>¡No Tienes Agendas!</Text>
          <Text style={styles.noSchedulesSubtitle}>
            Coordina de forma facil y rapida el proximo paseo o cuidado para tu
            mascota
          </Text>
        </>
      ) : (
        <FlatList
          data={fakeSchedules}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <ServiceCard schedule={item} />}
          contentContainerStyle={styles.cardsFlatListContent}
          style={styles.cardsFlatListContainer}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
        />
      )}

      <View style={styles.buttonsContainer}>
        <CustomButton
          containerStyle={styles.servicesDoneButtonContainer}
          style={styles.servicesDoneButton}
          labelStyle={styles.servicesDoneButtonText}
          label="Realizados (9)"
          onPress={() => navigation.navigate('ServicesDoneScreen' as never)}
        />
        <CustomButton
          containerStyle={styles.newServiceButtonContainer}
          style={styles.newServiceButton}
          labelStyle={styles.newServiceButtonText}
          label="Agendar servicio"
          onPress={onPressNew}
        />
      </View>

      {showBlackLayer && (
        <>
          <Animated.View
            style={{...styles.blackLayerContainer, opacity: blackLayerOpacity}}>
            <TouchableOpacity
              style={styles.flex1}
              activeOpacity={1}
              onPress={hideBlackLayer}
            />
          </Animated.View>
          <Animated.View
            style={{
              ...styles.modalContainer,
              transform: [{translateY: modalPosition}],
            }}>
            <View style={styles.closerBar} />
            <Text style={styles.serviceTitle}>¿Sale Nuevo Servicio?</Text>
            <Text style={styles.serviceSubtitle}>
              ¡Imagina lo contenta que se pondra Lucy!
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button}>
                <Image source={walker} style={styles.serviceImage} />
                <View style={styles.imageLayerContainer}>
                  <View style={styles.imageBlackLayer} />
                  <Text style={styles.serviceText}>Paseo</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Image source={sitter} style={styles.serviceImage} />
                <View style={styles.imageLayerContainer}>
                  <View style={styles.imageBlackLayer} />
                  <Text style={styles.serviceText}>Cuidado</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    marginTop: 10,
    fontFamily: 'Poppins-Semibold',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '100',
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  sadDogImage: {
    marginTop: 50,
  },
  noSchedulesTitle: {
    fontSize: 18,
    marginTop: -40,
    fontFamily: 'Poppins-Semibold',
    color: '#000',
  },
  noSchedulesSubtitle: {
    fontSize: 12,
    fontWeight: '100',
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'center',
    marginTop: 5,
    width: '80%',
  },
  cardsFlatListContainer: {
    marginBottom: 10,
    width: '100%',
  },
  cardsFlatListContent: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  servicesDoneButtonContainer: {
    flex: 1,
    marginRight: 10,
  },
  servicesDoneButton: {
    height: 55,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderColor: '#1E96FF',
    borderWidth: 1,
  },
  servicesDoneButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#1E96FF',
  },
  newServiceButtonContainer: {
    flex: 1,
  },
  newServiceButton: {
    height: 55,
    marginBottom: 10,
    borderRadius: 10,
  },
  newServiceButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  blackLayerContainer: {
    flex: 1,
    width: screenWidth,
    backgroundColor: '#000',
    position: 'absolute',
    height: '100%',
  },
  flex1: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: screenWidth,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: 260,
  },
  closerBar: {
    width: 100,
    height: 5,
    backgroundColor: 'lightgray',
    borderRadius: 100,
    marginTop: 10,
  },
  serviceTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#000',
    marginTop: 20,
    marginBottom: -5,
  },
  serviceSubtitle: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    color: '#000',
    fontSize: 14,
    width: '90%',
    marginTop: 5,
    marginBottom: 10,
  },
  button: {
    width: 150,
    height: 150,
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 5,
    elevation: 5,
  },
  serviceImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageLayerContainer: {
    position: 'absolute',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  imageBlackLayer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.3,
    borderRadius: 10,
    position: 'absolute',
  },
  serviceText: {
    zIndex: 199,
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
  },
});

export default SchedulesScreen;
