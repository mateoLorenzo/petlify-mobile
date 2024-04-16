import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {AuthHeader} from '../../components/AuthHeader';

const RegisterScreen = () => {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.contentContainer}
        bounces={false}>
        <AuthHeader divisorText="Registrarme" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: 20,
  },
});

export default RegisterScreen;
