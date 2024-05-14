import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const PetDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text>PetDetailScreen</Text>
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

export default PetDetailScreen;
