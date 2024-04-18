import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomButton} from '../../../components/CustomButton';

const CustomButtonScreen = () => {
  const onPress = () => {};

  return (
    <View style={styles.screenContainer}>
      <CustomButton onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
});
export default CustomButtonScreen;
