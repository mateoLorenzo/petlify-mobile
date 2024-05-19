import React, {useContext} from 'react';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import SchedulesScreen from '../screens/Schedules';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PetDetailScreen from '../screens/PetDetail';
import {PetlifyContext} from '../context/PetlifyContext';

const Tab = createBottomTabNavigator();

const renderAddButton = (onPress: () => void) => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Icon name="add-outline" size={25} color="#FFF" />
    </TouchableOpacity>
  );
};

interface CustomTabBarButtonProps extends BottomTabBarButtonProps {
  iconName: string;
  label: string;
  closeModal: () => void;
}

function renderTabButton({
  onPress,
  accessibilityState,
  iconName,
  label,
  closeModal,
}: CustomTabBarButtonProps) {
  const focused = accessibilityState?.selected;
  const color = focused ? '#1E96FF' : 'gray';

  const pressHandler = (e: GestureResponderEvent) => {
    onPress && onPress(e);
    closeModal();
  };

  return (
    <TouchableOpacity
      onPress={pressHandler}
      style={[styles.tabButton]}
      activeOpacity={1}>
      <Icon name={iconName} size={24} color={color} />
      <Text style={{...styles.tabLabel, color}}>{label}</Text>
    </TouchableOpacity>
  );
}

export const BottomTabNavigator = () => {
  const {setIsOpenServiceModal} = useContext(PetlifyContext);

  const openNewServiceModal = () => {
    setIsOpenServiceModal(true);
  };

  const closeNewServiceModal = () => {
    setIsOpenServiceModal(false);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyles,
      }}
      sceneContainerStyle={styles.containerStyle}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarButton: props =>
            renderTabButton({
              ...props,
              iconName: 'home-outline',
              label: 'Inicio',
              closeModal: () => closeNewServiceModal(),
            }),
        }}
      />
      <Tab.Screen
        options={{
          tabBarButton: props =>
            renderTabButton({
              ...props,
              iconName: 'calendar-outline',
              label: 'Agendas',
              closeModal: () => closeNewServiceModal(),
            }),
        }}
        name="SchedulesScreen"
        component={SchedulesScreen}
      />
      <Tab.Screen
        options={{tabBarButton: () => renderAddButton(openNewServiceModal)}}
        name="new"
        component={SchedulesScreen}
      />
      <Tab.Screen
        options={{
          tabBarButton: props =>
            renderTabButton({
              ...props,
              iconName: 'paw-outline',
              label: 'Mascotas',
              closeModal: () => closeNewServiceModal(),
            }),
        }}
        name="PetScreen"
        component={PetDetailScreen}
      />
      <Tab.Screen
        options={{
          tabBarButton: props =>
            renderTabButton({
              ...props,
              iconName: 'person-outline',
              label: 'Perfil',
              closeModal: () => closeNewServiceModal(),
            }),
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
    zIndex: 10,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 3,
    fontFamily: 'Poppins-Regular',
  },
});
