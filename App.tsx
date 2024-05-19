import React, {PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/routes/StackNavigator';
import {AppContextProvider} from './src/context/PetlifyContext';
import {NewServiceModal} from './src/components/NewServiceModal';
// import {BottomTabNavigator} from './src/routes/BottomTabNavigator';

const AppState = ({children}: PropsWithChildren) => (
  <AppContextProvider>{children}</AppContextProvider>
);

const App = () => {
  return (
    <AppState>
      <NavigationContainer>
        {/* <BottomTabNavigator /> */}
        <StackNavigator />
        <NewServiceModal />
      </NavigationContainer>
    </AppState>
  );
};

export default App;
