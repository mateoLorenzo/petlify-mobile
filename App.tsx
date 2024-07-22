import React, {PropsWithChildren, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParams, StackNavigator} from './src/routes/StackNavigator';
import {AppContextProvider} from './src/context/PetlifyContext';
import {NewServiceModal} from './src/components/NewServiceModal';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Settings} from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import Logo from './assets/images/logo.svg';

const AppState = ({children}: PropsWithChildren) => (
  <AppContextProvider>{children}</AppContextProvider>
);

const App = () => {
  const [initialRouteName, setInitialRouteName] =
    useState<keyof RootStackParams>('WelcomeScreen');
  const [loading, setLoading] = useState(true);

  const getInitialData = async () => {
    try {
      const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
      const accessToken = await AsyncStorage.getItem('accessToken');

      if (isFirstLaunch === null) {
        await AsyncStorage.setItem('isFirstLaunch', 'false');
        setInitialRouteName('WelcomeScreen');
      } else if (accessToken) {
        setInitialRouteName('BottomTabNavigator');
      } else {
        setInitialRouteName('PreSignUpScreen');
      }
    } catch (error) {
      console.error('Failed to get initial data', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Mínimo 2 segundos de carga
    }
  };

  useEffect(() => {
    getInitialData();
  }, []);

  GoogleSignin.configure({
    webClientId:
      '190649997221-ob12blrh3chl4mi1hpb5k6rv4couggb6.apps.googleusercontent.com',
    // androidClientId:
    //   '190649997221-q00o495gd94rdfkkb4bpii7cb17hs549.apps.googleusercontent.com',
    iosClientId:
      '190649997221-vi8aus39vouh9qphs4rt3o2bbsmvpr00.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
  });
  Settings.initializeSDK();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Logo height={150} width={150} style={styles.logo} />
        <Text style={styles.title}>Bienvenido a Petlify</Text>
        <Text style={styles.subtitle}>Mejora la vida de tu mascota</Text>
        <ActivityIndicator size="small" color="gray" style={styles.loader} />
      </View>
    );
  }

  return (
    <AppState>
      <NavigationContainer>
        <StackNavigator initialRouteName={initialRouteName} />
        <NewServiceModal />
      </NavigationContainer>
    </AppState>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    marginTop: 100,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 28,
    color: '#000',
    marginTop: 20,
  },
  subtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#4F4F4F',
  },
  loader: {
    marginTop: 50,
  },
});

export default App;
