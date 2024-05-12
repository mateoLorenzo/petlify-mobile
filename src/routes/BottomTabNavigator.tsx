import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import SchedulesScreen from '../screens/Schedules';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PetDetailScreen from '../screens/PetDetail';

const Tab = createBottomTabNavigator();

const renderTabIcon = (name: string, color: string) => {
  return <Icon name={name} size={25} color={color} />;
};

const renderAddButton = () => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={() => {}}>
      <Icon name="add-outline" size={25} color="#FFF" />
    </TouchableOpacity>
  );
};

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyles,
      }}
      sceneContainerStyle={styles.containerStyle}>
      <Tab.Screen
        options={{
          title: 'Inicio',
          tabBarIcon: ({color}) => renderTabIcon('home-outline', color),
          tabBarLabelStyle: styles.labelStyle,
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          title: 'Agendas',
          tabBarIcon: ({color}) => renderTabIcon('calendar-outline', color),
          tabBarLabelStyle: styles.labelStyle,
        }}
        name="SchedulesScreen"
        component={SchedulesScreen}
      />
      <Tab.Screen
        options={{tabBarButton: renderAddButton}}
        name="new"
        component={SchedulesScreen}
      />
      <Tab.Screen
        options={{
          title: 'Mascotas',
          tabBarIcon: ({color}) => renderTabIcon('paw-outline', color),
          tabBarLabelStyle: styles.labelStyle,
        }}
        name="PetScreen"
        component={PetDetailScreen}
      />
      <Tab.Screen
        options={{
          title: 'Perfil',
          tabBarIcon: ({color}) => renderTabIcon('person-outline', color),
          tabBarLabelStyle: styles.labelStyle,
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: '#1E96FF',
    borderRadius: 100,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  labelStyle: {
    fontSize: 12,
    marginTop: -10,
    fontFamily: 'Poppins-Regular',
  },
  tabBarStyles: {
    paddingTop: 10,
    height: 100,
    flexDirection: 'column',
    borderWidth: 0,
    shadowColor: '#757575',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
  },
});
