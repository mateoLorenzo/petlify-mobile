import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/routes/StackNavigator';
// import {LogBox} from 'react-native';

const App = () => {
  // ignore warnings
  // LogBox.ignoreAllLogs();

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
