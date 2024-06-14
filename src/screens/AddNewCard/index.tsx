import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const AddNewCardScreen = () => {
  return (
    <View style={styles.container}>
      <Text>AddNewCardScreen</Text>
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

export default AddNewCardScreen;
