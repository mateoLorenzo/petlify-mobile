import React from 'react';
import {Keyboard, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

export const DismissKeyboard = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) => (
  <TouchableOpacity
    activeOpacity={1}
    style={[styles.container, style]}
    onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
