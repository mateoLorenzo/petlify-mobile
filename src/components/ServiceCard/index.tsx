import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {ScheduleDetails} from '../../interfaces';
import {getScheduleDateInfo} from '../../services';
import React from 'react';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  schedule: ScheduleDetails;
}

export const ServiceCard = ({schedule}: Props) => {
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

const styles = StyleSheet.create({
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
    color: '#000',
  },
  petName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginLeft: 10,
    marginTop: -2,
    color: 'gray',
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
    elevation: 4,
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
});
