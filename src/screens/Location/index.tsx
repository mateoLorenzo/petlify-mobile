import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const LocationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>LocationScreen</Text>
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

export default LocationScreen;
