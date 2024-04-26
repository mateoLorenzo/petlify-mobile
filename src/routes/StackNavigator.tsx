import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import ComponentsScreen from '../screens/Tests';
import CustomButtonScreen from '../screens/Tests/Button';
import ReactHookFormScreen from '../screens/Tests/ReactHookForm';
import CustomSpinnerScreen from '../screens/Tests/Spinner';
import RegisterPetScreen from '../screens/RegisterPet';
import PetDetailScreen from '../screens/PetDetail';
import RegisterPhoneScreen from '../screens/RegisterPhone';
import ExpandAnimationScreen from '../screens/Tests/ExpandAnimation';
import CountdownTimerScreen from '../screens/CountdownTimer';

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
        name="RegisterPhoneScreen"
        component={RegisterPhoneScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ComponentsNavigator"
        component={ComponentsNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterPetScreen"
        component={RegisterPetScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PetDetailScreen"
        component={PetDetailScreen}
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
      <Stack.Screen
        name="ReactHookFormScreen"
        component={ReactHookFormScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ExpandAnimationScreen"
        component={ExpandAnimationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CountdownTimerScreen"
        component={CountdownTimerScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
