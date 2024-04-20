import React from 'react';
import Logo from '../../../assets/images/logo.svg';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface IScreenProps {
  divisorText: string;
}

export const AuthHeader = ({divisorText}: IScreenProps) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('ComponentsNavigator' as never)}>
        <Logo height={100} width={100} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.title}>Bienvenido a Petlify</Text>
      <Text style={styles.subtitle}>¡Mejora la vida de tu mascota!</Text>

      <View style={styles.divisorContainer}>
        <View style={styles.divisorLine} />
        <Text style={styles.divisorText}>{divisorText}</Text>
        <View style={styles.divisorLine} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: '#5C5C5C',
  },
  divisorContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  divisorLine: {
    height: 1,
    backgroundColor: '#8F8F8F',
    flex: 1,
  },
  divisorText: {
    marginHorizontal: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#8F8F8F',
    fontSize: 16,
  },
});
