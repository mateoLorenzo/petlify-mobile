import React from 'react';
import {StyleSheet, View} from 'react-native';
import {OTPInput} from '../../../components/OneTimePassCode';

const OneTimePassCodeScreen = () => {
  return (
    <View style={styles.container}>
      <OTPInput
        length={4}
        value={[]}
        disabled={false}
        onChange={value => console.log(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default OneTimePassCodeScreen;
