import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import ComponentsScreen from '../screens/Tests';
import CustomButtonScreen from '../screens/Tests/Button';
import ReactHookFormScreen from '../screens/Tests/ReactHookForm';
import CustomSpinnerScreen from '../screens/Tests/Spinner';
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
import RegisterPetInvitationScreen from '../screens/RegisterPetInvitation';
import RegisterPetScreen from '../screens/RegisterPet';
import ServicesDoneAnimationScreen from '../screens/Tests/ServicesDoneAnimation';
import ServicesDoneScreen from '../screens/ServicesDone';
import UpdatePetScreen from '../screens/UpdatePet';
import ServicesFeesScreen from '../screens/ServicesFees';
import WorkerProfileScreen from '../screens/WorkerProfile';
import WelcomeScreen from '../screens/Welcome';
import OnboardingScreens from '../screens/Onboarding';
import PreSignUpScreen from '../screens/PreSignUp';
import ServiceRequestScreen from '../screens/ServiceRequest';
import LocationScreen from '../screens/Location';
import SelectDateScreen from '../screens/SelectDate';
import SelectPetScreen from '../screens/SelectPet';
import NewLocationScreen from '../screens/NewLocation';
import AddNewCardScreen from '../screens/AddNewCard';
import ConfirmServiceScreen from '../screens/ConfirmService';
import SelectPaymentMethodScreen from '../screens/SelectPaymentMethod';
import PaymentSuccessScreen from '../screens/PaymentSuccess';
import ServiceDetailScreen from '../screens/ServiceDetail';

export type RootStackParams = {
  WelcomeScreen: undefined;
  OnboardingScreens: undefined;
  PreSignUpScreen: undefined;
  loginScreen: undefined;
  RegisterScreen: undefined;
  RegisterPhoneScreen: undefined;
  ComponentsNavigator: undefined;
  RegisterPetInvitationScreen: undefined;
  RegisterPetScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
  ProfileEditScreen: undefined;
  BottomTabNavigator: undefined;
  ServicesDoneScreen: undefined;
  UpdatePetScreen: undefined;
  ServicesFeesScreen: undefined;
  WorkerProfileScreen: undefined;
  ServiceRequestScreen: {service: 'walk' | 'care'};
  LocationScreen: undefined;
  SelectDateScreen: undefined;
  SelectPetScreen: undefined;
  NewLocationScreen: undefined;
  ConfirmServiceScreen: undefined;
  SelectPaymentMethodScreen: undefined;
  AddNewCardScreen: undefined;
  PaymentSuccessScreen: undefined;
  ServiceDetailScreen: undefined;

  ComponentsScreen: undefined;
  CustomButtonScreen: undefined;
  CustomSpinnerScreen: undefined;
  ReactHookFormScreen: undefined;
  ExpandAnimationScreen: undefined;
  CountdownTimerScreen: undefined;
  AgePickerScreen: undefined;
  ImagePickerScreen: undefined;
  CustomDropdown: undefined;
  BottomNavScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnboardingScreens"
        component={OnboardingScreens}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PreSignUpScreen"
        component={PreSignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="loginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
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
        name="RegisterPetInvitationScreen"
        component={RegisterPetInvitationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterPetScreen"
        component={RegisterPetScreen}
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
      <Stack.Screen
        name="ServicesDoneScreen"
        component={ServicesDoneScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpdatePetScreen"
        component={UpdatePetScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ServicesFeesScreen"
        component={ServicesFeesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WorkerProfileScreen"
        component={WorkerProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ServiceRequestScreen"
        component={ServiceRequestScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LocationScreen"
        component={LocationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelectDateScreen"
        component={SelectDateScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelectPetScreen"
        component={SelectPetScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewLocationScreen"
        component={NewLocationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ConfirmServiceScreen"
        component={ConfirmServiceScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddNewCardScreen"
        component={AddNewCardScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelectPaymentMethodScreen"
        component={SelectPaymentMethodScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentSuccessScreen"
        component={PaymentSuccessScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ServiceDetailScreen"
        component={ServiceDetailScreen}
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
      <Stack.Screen
        name="ServicesDoneScreen"
        component={ServicesDoneAnimationScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
