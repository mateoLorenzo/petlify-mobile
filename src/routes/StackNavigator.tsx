import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';

const Stack = createNativeStackNavigator();

export const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="loginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};
