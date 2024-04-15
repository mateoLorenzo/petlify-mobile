import 'react-native-gesture-handler';
import React from 'react';
import LoginScreen from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <LoginScreen />
    </NavigationContainer>
  );
};

export default App;
