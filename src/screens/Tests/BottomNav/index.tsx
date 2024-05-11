import React from 'react';
import {StyleSheet, View} from 'react-native';
import BottomNav from '../../../components/BottomNav';

const BottomNavScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.flex1} />
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
});

export default BottomNavScreen;
