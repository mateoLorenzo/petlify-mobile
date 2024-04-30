import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {AgePicker} from '../../../components/AgePicker';

const AgePickerScreen = () => {
  const [yearSelected, setYearSelected] = useState('1');
  const [monthSelected, setMonthSelected] = useState('1');
  return (
    <View style={styles.container}>
      <AgePicker
        yearSelected={yearSelected}
        monthSelected={monthSelected}
        setYearSelected={setYearSelected}
        setMonthSelected={setMonthSelected}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AgePickerScreen;
