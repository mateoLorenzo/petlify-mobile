import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const OnboardingScreen2 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>OnboardingScreen2</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('OnboardingScreen3' as never)}>
        <Text>Go to Onboarding Screen 3</Text>
      </TouchableOpacity>
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

export default OnboardingScreen2;
