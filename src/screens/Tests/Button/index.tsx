import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomButton} from '../../../components/CustomButton';

const CustomButtonScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const onPress = () => {
    setIsLoading(true);
  };

  return (
    <View style={styles.screenContainer}>
      <CustomButton onPress={onPress} label="Press me" loading={isLoading} />
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
