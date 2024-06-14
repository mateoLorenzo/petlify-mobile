import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {TimePicker} from '../../components/TimePicker';
import {CustomButton} from '../../components/CustomButton';

const DateScreen = () => {
  const [startHour, setStartHour] = useState('00');
  const [startMinute, setStartMinute] = useState('00');
  const [endHour, setEndHour] = useState('00');
  const [endMinute, setEndMinute] = useState('00');

  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState<string>('');

  return (
    <View style={{...styles.container}}>
      <View style={{...styles.titleContainer, marginTop: top + 20}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backArrowButton}>
          <Icon name="arrow-back" size={25} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Fecha</Text>
      </View>
      <View style={{width: '100%', marginBottom: 20}}>
        <Text style={styles.serviceDateText}>Dia del paseo</Text>
        <View
          style={{
            ...styles.calendarBox,
            ...styles.shadow,
          }}>
          <Calendar
            style={{borderRadius: 10}}
            onDayPress={day => {
              setSelectedDate(day.dateString);
            }}
            theme={{
              textDayFontFamily: 'Poppins-Medium',
              textDayHeaderFontFamily: 'Poppins-Regular',
            }}
            markedDates={{
              [selectedDate]: {selected: true, selectedColor: '#1E96FF'},
            }}
          />
        </View>
      </View>

      <View style={styles.timePickersContainer}>
        <TimePicker
          label={`Hora de partida ${startHour}: ${startMinute}`}
          hourSelected={startHour}
          minuteSelected={startMinute}
          setHourSelected={setStartHour}
          setMinuteSelected={setStartMinute}
        />
        <TimePicker
          label={`Hora de regreso ${endHour}: ${endMinute}`}
          hourSelected={endHour}
          minuteSelected={endMinute}
          setHourSelected={setEndHour}
          setMinuteSelected={setEndMinute}
        />
      </View>

      <View style={styles.spacer} />

      <CustomButton
        label="Continuar"
        onPress={() => navigation.goBack()}
        style={{
          ...styles.continueButton,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  serviceDateText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
  },
  calendarBox: {
    width: '100%',
    minHeight: 300,
    backgroundColor: 'white',
  },
  backArrowButton: {
    position: 'absolute',
    left: 0,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourBlocksContainer: {
    flexDirection: 'row',
  },
  hourBlockContainer: {
    flex: 1,
  },
  leftHourContainer: {
    marginLeft: 10,
  },
  hourBlock: {
    height: 100,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  hourBlockText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
  },
  shadow: {
    shadowColor: '#B9B9B9',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    borderRadius: 10,
  },
  selectedTime: {
    marginTop: 20,
    fontSize: 18,
  },
  pickersContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  timePickersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    marginTop: 20,
  },
  spacer: {
    flex: 1,
  },
  continueButton: {
    marginTop: 20,
    height: 55,
    marginBottom: 40,
  },
});

export default DateScreen;
