import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const DateScreen = () => {
  return (
    <View style={styles.container}>
      <Text>DateScreen</Text>
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

export default DateScreen;
