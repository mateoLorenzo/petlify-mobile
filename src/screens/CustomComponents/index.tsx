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
      <ComponentButton
        name="Custom Button"
        onPress={() => navigation.navigate('CustomButtonScreen' as never)}
      />
      <ComponentButton
        name="Custom Spinner"
        onPress={() => navigation.navigate('CustomSpinnerScreen' as never)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
