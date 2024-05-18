import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/routes/StackNavigator';
import {BottomTabNavigator} from './src/routes/BottomTabNavigator';
// import {LogBox} from 'react-native';

const App = () => {
  // LogBox.ignoreAllLogs();

  return (
    <NavigationContainer>
      {/* <BottomTabNavigator /> */}
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
