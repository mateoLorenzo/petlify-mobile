import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const NewLocationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>NewLocationScreen</Text>
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

export default NewLocationScreen;
