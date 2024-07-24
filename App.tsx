/* eslint-disable react-hooks/exhaustive-deps */
import React, {PropsWithChildren, useEffect, useState, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParams, StackNavigator} from './src/routes/StackNavigator';
import {AppContextProvider} from './src/context/PetlifyContext';
import {NewServiceModal} from './src/components/NewServiceModal';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Settings} from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, StyleSheet, Animated} from 'react-native';
import Logo from './assets/images/logo.svg';

const AppState = ({children}: PropsWithChildren) => (
  <AppContextProvider>{children}</AppContextProvider>
);

const App = () => {
  const [initialRouteName, setInitialRouteName] = useState<
    keyof RootStackParams | null
  >(null);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const getInitialData = async () => {
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
  };

  useEffect(() => {
    getInitialData().then(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setLoading(false));
    });
  }, []);

  GoogleSignin.configure({
    webClientId:
      '190649997221-ob12blrh3chl4mi1hpb5k6rv4couggb6.apps.googleusercontent.com',
    iosClientId:
      '190649997221-vi8aus39vouh9qphs4rt3o2bbsmvpr00.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
  });
  Settings.initializeSDK();

  return (
    <AppState>
      <View style={styles.container}>
        <NavigationContainer>
          {initialRouteName && (
            <StackNavigator initialRouteName={initialRouteName} />
          )}
          <NewServiceModal />
        </NavigationContainer>
        {loading && (
          <Animated.View style={[styles.loadingContainer, {opacity: fadeAnim}]}>
            <Logo height={200} width={200} />
          </Animated.View>
        )}
      </View>
    </AppState>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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
