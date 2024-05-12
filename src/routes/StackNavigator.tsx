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
import AnimationsScreen from '../screens/Tests/Animations';
import CountdownTimerScreen from '../screens/CountdownTimer';
import AgePickerScreen from '../screens/Tests/AgePicker';
import ImagePickerScreen from '../screens/Tests/ImagePicker';
import CustomDropdown from '../screens/Tests/CustomDropdown';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import BottomNavScreen from '../screens/Tests/BottomNav';
import ProfileEditScreen from '../screens/ProfileEdit';
import {BottomTabNavigator} from './BottomTabNavigator';

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
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileEditScreen"
        component={ProfileEditScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
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
        component={AnimationsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CountdownTimerScreen"
        component={CountdownTimerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AgePickerScreen"
        component={AgePickerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ImagePickerScreen"
        component={ImagePickerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CustomDropdown"
        component={CustomDropdown}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomNavScreen"
        component={BottomNavScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
