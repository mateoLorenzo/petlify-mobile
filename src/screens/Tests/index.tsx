import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface IComponentButtonProps {
  name: string;
  onPress?: () => void;
}

const ComponentButton = ({name, onPress}: IComponentButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.5}
      onPress={onPress}>
      <Text style={styles.buttonText}>{name}</Text>
      <Icon name="chevron-forward-outline" size={25} color="#000" />
    </TouchableOpacity>
  );
};

const ComponentsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Laboratory</Text>
      <ComponentButton
        name="Custom Button"
        onPress={() => navigation.navigate('CustomButtonScreen' as never)}
      />
      <ComponentButton
        name="Custom Spinner"
        onPress={() => navigation.navigate('CustomSpinnerScreen' as never)}
      />
      <ComponentButton
        name="React Hook Form"
        onPress={() => navigation.navigate('ReactHookFormScreen' as never)}
      />
      <ComponentButton
        name="Expand Animation"
        onPress={() => navigation.navigate('ExpandAnimationScreen' as never)}
      />
      <ComponentButton
        name="Countdown Timer"
        onPress={() => navigation.navigate('CountdownTimerScreen' as never)}
      />
      <ComponentButton
        name="Age Picker"
        onPress={() => navigation.navigate('AgePickerScreen' as never)}
      />
      <ComponentButton
        name="Image Picker"
        onPress={() => navigation.navigate('ImagePickerScreen' as never)}
      />
      <ComponentButton
        name="Custom Dropdown"
        onPress={() => navigation.navigate('CustomDropdown' as never)}
      />
      <ComponentButton
        name="Bottom Navigation Bar"
        onPress={() => navigation.navigate('BottomNavScreen' as never)}
      />
      <ComponentButton
        name="Bottom Tab Navigator"
        onPress={() => navigation.navigate('BottomTabNavigator' as never)}
      />
      <ComponentButton
        name="Services Done Animation"
        onPress={() => navigation.navigate('ServicesDoneScreen' as never)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
  },
  button: {
    marginVertical: 5,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
});

export default ComponentsScreen;
