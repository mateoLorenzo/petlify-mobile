import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const OnboardingScreen3 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>OnboardingScreen3</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('loginScreen' as never)}>
        <Text>Go to Home</Text>
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

export default OnboardingScreen3;
