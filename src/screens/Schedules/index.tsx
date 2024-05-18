/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Logo from '../../../assets/images/logo.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SadDog from '../../../assets/images/sad-dog.svg';
import {CustomButton} from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {getScheduleDateInfo} from '../../services';
import {useNavigation} from '@react-navigation/native';
const matumoto = require('../../../assets/images/matumoto.png');
const lucy = require('../../../assets/images/lucy.jpeg');
const walker = require('../../../assets/images/paseo.png');
const sitter = require('../../../assets/images/cuidado.png');

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

interface ScheduleDetails {
  serviceType: 'walk' | 'care';
  walkerName: string;
  walkerImage: ImageSourcePropType;
  petName: string;
  petImage: ImageSourcePropType;
  date: Date;
  time: string;
}

const schedules: ScheduleDetails[] = [
  {
    serviceType: 'walk',
    walkerName: 'Mateo Lorenzo',
    walkerImage: matumoto,
    petName: 'Paseo con Lucy',
    petImage: lucy,
    date: new Date('2024-05-15'),
    time: '17:00hs',
  },
  {
    serviceType: 'walk',
    walkerName: 'Mateo Lorenzo',
    walkerImage: matumoto,
    petName: 'Paseo con Lucy',
    petImage: lucy,
    date: new Date('2024-05-15'),
    time: '17:00hs',
  },
  {
    serviceType: 'walk',
    walkerName: 'Mateo Lorenzo',
    walkerImage: matumoto,
    petName: 'Paseo con Lucy',
    petImage: lucy,
    date: new Date('2024-05-15'),
    time: '17:00hs',
  },
  {
    serviceType: 'walk',
    walkerName: 'Mateo Lorenzo',
    walkerImage: matumoto,
    petName: 'Paseo con Lucy',
    petImage: lucy,
    date: new Date('2024-05-15'),
    time: '17:00hs',
  },
  {
    serviceType: 'care',
    walkerName: 'Mateo Lorenzo',
    walkerImage: matumoto,
    petName: 'Cuidado con Lucy',
    petImage: lucy,
    date: new Date('2024-05-18'),
    time: '18:00hs',
  },
  {
    serviceType: 'care',
    walkerName: 'Mateo Lorenzo',
    walkerImage: matumoto,
    petName: 'Cuidado con Lucy',
    petImage: lucy,
    date: new Date('2024-05-18'),
    time: '18:00hs',
  },
  {
    serviceType: 'care',
    walkerName: 'Mateo Lorenzo',
    walkerImage: matumoto,
    petName: 'Cuidado con Lucy',
    petImage: lucy,
    date: new Date('2024-05-18'),
    time: '18:00hs',
  },
];

const ServiceCard = (schedule: ScheduleDetails) => {
  const backgroundColor =
    schedule.serviceType === 'walk' ? '#1E96FF' : '#ff7415';
  const scheduleDate = getScheduleDateInfo(schedule.date);

  return (
    <View style={styles.scheduleCard}>
      <View style={styles.cardTopSection}>
        <View>
          <Image style={styles.walkerImage} source={schedule.walkerImage} />
          <Image style={styles.petImage} source={schedule.petImage} />
        </View>
        <View>
          <Text style={styles.walkerName}>{schedule.walkerName}</Text>
          <Text style={styles.petName}>{schedule.petName}</Text>
        </View>
        <View style={styles.spacer} />
        <View style={styles.shadow}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.chatIconContainer}>
            <Icon name="chatbox-outline" size={15} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{...styles.cardBottomSection, backgroundColor}}>
        <Icon name="calendar-outline" size={20} color="#FFF" />
        <Text style={styles.dateText}>{scheduleDate.dayOfWeek},</Text>
        <Text style={styles.extendedDateText}>
          {scheduleDate.formattedDate}
        </Text>
        <View style={styles.spacer} />
        <IconAnt name="clockcircleo" size={20} color="#FFF" />
        <Text style={styles.scheduleTime}>{schedule.time}</Text>
      </View>
    </View>
  );
};

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
          data={schedules}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => ServiceCard(item)}
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
  scrollViewContent: {
    alignItems: 'center',
    flexGrow: 1,
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
  contentContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
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
  flatListContainer: {
    width: '100%',
    flex: 1,
    position: 'absolute',
  },
  servicesDoneFlatList: {
    position: 'absolute',
    bottom: 0,
  },
  cardsFlatListContent: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  scheduleCard: {
    marginBottom: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 20,
    padding: 15,
  },
  cardTopSection: {
    flexDirection: 'row',
  },
  walkerImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  petImage: {
    width: 20,
    height: 20,
    backgroundColor: 'black',
    borderRadius: 50,
    position: 'absolute',
    bottom: -5,
    right: 0,
  },
  walkerName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginLeft: 10,
  },
  petName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginLeft: 10,
    marginTop: -2,
  },
  spacer: {
    flex: 1,
    width: '100%',
  },
  shadow: {
    shadowColor: '#757575',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 2,
    shadowRadius: 1,
    borderRadius: 15,
  },
  chatIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBottomSection: {
    width: '100%',
    borderRadius: 15,
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    color: '#fff',
    marginLeft: 5,
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  extendedDateText: {
    color: '#DFDFDF',
    fontFamily: 'Poppins-Regular',
    marginLeft: 5,
    fontSize: 12,
  },
  scheduleTime: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
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

  screenContainer: {
    width: screenWidth,
    height: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
  },
  blackLayerContainer: {
    flex: 1,
    width: screenWidth,
    backgroundColor: '#000',
    position: 'absolute',
    height: '100%',
  },
  blackLayer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    zIndex: 10,
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
  footerContainer: {
    width: screenWidth,
    height: 80,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: 'lightgray',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#1E96FF',
    padding: 15,
    borderRadius: 100,
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
