import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import ComponentsScreen from '../screens/CustomComponents';
import CustomButtonScreen from '../screens/CustomComponents/Button';
import CustomSpinnerScreen from '../screens/CustomComponents/Spinner';

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="loginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="registerScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ComponentsNavigator"
        component={ComponentsNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const ComponentsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ComponentsScreen"
        component={ComponentsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CustomButtonScreen"
        component={CustomButtonScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CustomSpinnerScreen"
        component={CustomSpinnerScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
