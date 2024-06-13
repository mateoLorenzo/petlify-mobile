import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {AgePicker} from '../../components/AgePicker';
// import {`[Calendar](#calendar), [CalendarList](#calendarlist), [Agenda](#agenda)`} from 'react-native-calendars';
const DateScreen = () => {
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
      <View style={styles.hourBlocksContainer}>
        <View style={styles.hourBlockContainer}>
          <Text style={styles.hourBlockText}>Hora de partida</Text>
          <View style={{...styles.hourBlock, ...styles.shadow}} />
        </View>
        <View
          style={{...styles.hourBlockContainer, ...styles.leftHourContainer}}>
          <Text style={styles.hourBlockText}>Hora de regreso</Text>
          <View style={{...styles.hourBlock, ...styles.shadow}} />
        </View>
      </View>
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
});

export default DateScreen;
