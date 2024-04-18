import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomSpinner} from '../../../components/Spinner';

const CustomSpinnerScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <CustomSpinner color="#1E96FF" durationMs={600} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomSpinnerScreen;
