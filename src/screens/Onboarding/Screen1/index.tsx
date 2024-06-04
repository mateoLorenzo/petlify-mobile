import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const OnboardingScreen1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>OnboardingScreen1</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('OnboardingScreen2' as never)}>
        <Text>Go to Onboarding Screen 2</Text>
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

export default OnboardingScreen1;
