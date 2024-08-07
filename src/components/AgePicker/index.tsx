import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {Platform, StyleSheet, View} from 'react-native';

interface Props {
  yearSelected: string;
  monthSelected: string;
  setYearSelected: (year: string) => void;
  setMonthSelected: (month: string) => void;
}

export const AgePicker = ({
  yearSelected,
  monthSelected,
  setYearSelected,
  setMonthSelected,
}: Props) => {
  const totalYears = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const totalMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={yearSelected}
          style={styles.pickerWidth}
          onValueChange={setYearSelected}>
          {totalYears.map(year => (
            <Picker.Item label={`${year}`} key={year} value={`${year}`} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={monthSelected}
          style={styles.pickerWidth}
          onValueChange={setMonthSelected}>
          {totalMonth.map(month => (
            <Picker.Item label={`${month}`} key={month} value={`${month}`} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pickerContainer: {
    width: Platform.OS === 'android' ? 150 : undefined,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  pickerWidth: {
    width: Platform.OS === 'android' ? 100 : 150,
  },
});
