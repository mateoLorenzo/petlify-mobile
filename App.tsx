import React, {PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/routes/StackNavigator';
import {AppContextProvider} from './src/context/PetlifyContext';
import {NewServiceModal} from './src/components/NewServiceModal';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Settings} from 'react-native-fbsdk-next';

const AppState = ({children}: PropsWithChildren) => (
  <AppContextProvider>{children}</AppContextProvider>
);

const App = () => {
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
  return (
    <AppState>
      <NavigationContainer>
        <StackNavigator />
        <NewServiceModal />
      </NavigationContainer>
    </AppState>
  );
};

export default App;
