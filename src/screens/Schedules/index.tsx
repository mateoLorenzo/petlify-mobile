/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  ScrollView,
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
    date: new Date('2024-05-16'),
    time: '15:00hs',
  },
  {
    serviceType: 'care',
    walkerName: 'Mateo Lorenzo',
    walkerImage: matumoto,
    petName: 'Cuidado con Lucy',
    petImage: lucy,
    date: new Date('2024-05-17'),
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

const SchedulesScreen = () => {
  const {top: marginTop} = useSafeAreaInsets();

  const [scheduledWalks, setScheduledWalks] = useState(1);
  const [scheduledCares, setScheduledCares] = useState(0);

  const userHasSchedules = scheduledWalks > 0 && scheduledCares > 0;
  const date = getScheduleDateInfo(new Date('2024-09-23'));
  console.log('test of date', date);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContent}>
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
        schedules.map((schedule, i) => {
          const backgroundColor =
            schedule.serviceType === 'walk' ? '#1E96FF' : '#ff7415';
          const scheduleDate = getScheduleDateInfo(schedule.date);

          return (
            <View style={styles.scheduleCard} key={i}>
              <View style={styles.cardTopSection}>
                <View>
                  <Image
                    style={styles.walkerImage}
                    source={schedule.walkerImage}
                  />
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
        })
      )}

      <View style={styles.bottomSpacer} />

      <View style={styles.bottomButtonsContainer}>
        <CustomButton
          containerStyle={styles.servicesDoneButtonContainer}
          style={styles.servicesDoneButton}
          labelStyle={styles.servicesDoneButtonText}
          label="Realizados"
          onPress={() => {}}
        />
        <CustomButton
          containerStyle={styles.newServiceButtonContainer}
          style={styles.newServiceButton}
          labelStyle={styles.newServiceButtonText}
          label="Agendar servicio"
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
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
  scheduleCard: {
    marginTop: 10,
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
  bottomSpacer: {
    flexGrow: 1,
    minHeight: 20,
  },
  bottomButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  servicesDoneButtonContainer: {
    flex: 2,
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
    flex: 3,
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
