import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {StyleSheet, View, Text} from 'react-native';

interface Props {
  label: string;
  hourSelected: string;
  minuteSelected: string;
  setHourSelected: (hour: string) => void;
  setMinuteSelected: (minute: string) => void;
}

export const TimePicker = ({
  label,
  hourSelected,
  minuteSelected,
  setHourSelected,
  setMinuteSelected,
}: Props) => {
  const totalHours = Array.from({length: 24}, (_, i) =>
    i.toString().padStart(2, '0'),
  );
  const totalMinutes = Array.from({length: 60}, (_, i) =>
    i.toString().padStart(2, '0'),
  );

  return (
    <View style={styles.timePickerContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={hourSelected}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          onValueChange={setHourSelected}>
          {totalHours.map(hour => (
            <Picker.Item label={hour} key={hour} value={hour} />
          ))}
        </Picker>
        <Text style={styles.colon}>:</Text>
        <Picker
          selectedValue={minuteSelected}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          onValueChange={setMinuteSelected}>
          {totalMinutes.map(minute => (
            <Picker.Item label={minute} key={minute} value={minute} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timePickerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    width: '100%',
    fontFamily: 'Poppins-Regular',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    overflow: 'hidden',
  },
  picker: {
    width: 80,
  },
  pickerItem: {
    fontSize: 14,
  },
  colon: {
    fontSize: 18,
  },
});

export default TimePicker;
