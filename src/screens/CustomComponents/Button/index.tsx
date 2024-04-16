import React, {useRef} from 'react';
import {View, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import {CustomSpinner} from '../Spinner';

const CustomButtonScreen = () => {
  const textPosition = useRef(new Animated.Value(0)).current;
  const loaderPosition = useRef(new Animated.Value(50)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const loaderOpacity = useRef(new Animated.Value(0)).current;

  const moveTextUP = (initPosition: number, duration: number = 200) => {
    Animated.timing(textPosition, {
      toValue: initPosition,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const moveLoaderUP = (initPosition: number, duration: number = 200) => {
    Animated.timing(loaderPosition, {
      toValue: initPosition,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOutButtonText = () => {
    Animated.timing(loaderPosition, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeInLoader = () => {
    Animated.timing(loaderOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => {
          moveTextUP(-50);
          fadeOutButtonText();
          fadeInLoader();
          moveLoaderUP(0);
        }}>
        <Animated.Text
          style={{
            ...styles.buttonText,
            transform: [{translateY: textPosition}],
            opacity: textOpacity,
          }}>
          Custom Button
        </Animated.Text>
        <Animated.View
          style={{
            opacity: loaderOpacity,
            transform: [{translateY: loaderPosition}],
          }}>
          <CustomSpinner color="white" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  buttonBackLayer: {
    backgroundColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 70,
    backgroundColor: '#1E96FF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1E96FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    position: 'absolute',
    zIndex: -1,
  },
});

export default CustomButtonScreen;
