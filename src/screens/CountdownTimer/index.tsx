import React from 'react';
import {StyleSheet, View} from 'react-native';
import CountdownTimer from '../../components/CountdownTimer';

const CountdownTimerScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <CountdownTimer />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CountdownTimerScreen;
