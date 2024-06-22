import React from 'react';
import {Keyboard, StyleSheet, TouchableOpacity} from 'react-native';

export const DismissKeyboard = ({children}: {children: React.ReactNode}) => (
  <TouchableOpacity
    activeOpacity={1}
    style={styles.container}
    onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
