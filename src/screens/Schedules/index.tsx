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
const matumoto = require('../../../assets/images/matumoto.png');
const lucy = require('../../../assets/images/lucy.jpeg');

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

const ServiceDoneCard = () => {
  return (
    <View
      style={{
        width: screenWidth - 40,
        height: 100,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 15,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Service Done</Text>
    </View>
  );
};

const SchedulesScreen = () => {
  const {top: marginTop} = useSafeAreaInsets();

  const [scheduledWalks, setScheduledWalks] = useState(1);
  const [scheduledCares, setScheduledCares] = useState(0);
  const [servicesShowing, setServicesShowing] = useState<'TODO' | 'DONE'>(
    'TODO',
  );
  const userHasSchedules = scheduledWalks > 0 && scheduledCares > 0;

  const servicesToDoPosition = useRef(new Animated.Value(0)).current;
  const servicesDonePosition = useRef(new Animated.Value(screenHeight)).current;
  const servicesToDoOpacity = useRef(new Animated.Value(1)).current;
  const servicesDoneOpacity = useRef(new Animated.Value(1)).current;
  const contentButtonPosition = useRef(
    new Animated.Value(screenHeight - 470),
  ).current;

  const moveServicesToDo = () => {
    const toValue = servicesShowing === 'TODO' ? screenHeight * -0.5 : 0;
    Animated.timing(servicesToDoPosition, {
      toValue: toValue,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };
  const moveServicesDone = () => {
    const toValue = servicesShowing === 'TODO' ? 0 : screenHeight * 0.7;
    Animated.timing(servicesDonePosition, {
      toValue: toValue,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };
  const changeServicesOpacity = () => {
    const toValue = servicesShowing === 'TODO' ? 0 : 1;
    Animated.timing(servicesToDoOpacity, {
      toValue: toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(servicesDoneOpacity, {
      toValue: toValue === 0 ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setServicesShowing(prevState => (prevState === 'TODO' ? 'DONE' : 'TODO'));
    });
  };

  const moveContentButton = () => {
    const toValue = servicesShowing === 'TODO' ? 0 : screenHeight - 470;
    Animated.timing(contentButtonPosition, {
      toValue: toValue,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const onChangeContent = () => {
    moveServicesToDo();
    moveServicesDone();
    changeServicesOpacity();
    moveContentButton();
  };

  return (
    <View style={styles.container}>
      <View style={{...styles.titleContainer, marginTop}}>
        <Logo height={100} width={100} />
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
      </View>

      <View style={styles.contentContainer}>
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
              Coordina de forma facil y rapida el proximo paseo o cuidado para
              tu mascota
            </Text>
          </>
        ) : (
          <Animated.View
            style={{
              ...styles.flatListContainer,
              transform: [{translateY: servicesToDoPosition}],
              height: screenHeight - 470,
            }}>
            <FlatList
              data={schedules}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => ServiceCard(item)}
              contentContainerStyle={styles.cardsFlatListContent}
              style={styles.cardsFlatListContainer}
              showsVerticalScrollIndicator={false}
              overScrollMode="never"
            />
          </Animated.View>
        )}

        <Animated.View
          style={{
            ...styles.buttonsContainer,
            transform: [{translateY: contentButtonPosition}],
          }}>
          <TouchableOpacity
            onPress={onChangeContent}
            style={styles.servicesDoneButton}>
            <Text style={styles.servicesDoneButtonText}>
              Servicios Realizados
            </Text>
          </TouchableOpacity>
          <Animated.View style={{opacity: servicesToDoOpacity}}>
            <CustomButton
              style={styles.newServiceButton}
              labelStyle={styles.newServiceButtonText}
              label="Agendar servicio"
              onPress={() => {}}
            />
          </Animated.View>
        </Animated.View>

        <Animated.View
          style={{
            ...styles.servicesDoneFlatList,
            opacity: servicesDoneOpacity,
            transform: [{translateY: servicesDonePosition}],
            height: screenHeight - 410,
          }}>
          <FlatList
            data={schedules}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => ServiceDoneCard()}
            contentContainerStyle={styles.cardsFlatListContent}
            style={{...styles.cardsFlatListContainer, display: 'flex'}}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    height: 180,
  },
  scrollViewContent: {
    alignItems: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    marginTop: 10,
    fontFamily: 'Poppins-Semibold',
    height: 36,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '100',
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
    height: 24,
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
    position: 'absolute',
    zIndex: 1,
  },
  servicesDoneButton: {
    height: 55,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderColor: '#1E96FF',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  servicesDoneButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#1E96FF',
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
});

export default SchedulesScreen;
