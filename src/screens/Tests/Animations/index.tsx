import React, {useRef, useState} from 'react';
import {
  Animated,
  Button,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

const AnimationsScreen = () => {
  const {width: screenWidth} = useWindowDimensions();
  const boxWidth = useRef(new Animated.Value(100)).current;
  const contentPosition = useRef(new Animated.Value(0)).current;
  const [contentActualPosition, setContentActualPosition] = useState(0);

  const expandBox = () => {
    Animated.timing(boxWidth, {
      toValue: 300,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const moveContentLeft = () => {
    setContentActualPosition(contentActualPosition - screenWidth);
    Animated.timing(contentPosition, {
      toValue: contentActualPosition - screenWidth,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const moveContentRight = () => {
    setContentActualPosition(contentActualPosition + screenWidth);
    Animated.timing(contentPosition, {
      toValue: contentActualPosition + screenWidth,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <View style={styles.screenContainer}>
        <Animated.View
          style={{
            ...styles.box,
            width: boxWidth,
          }}
        />
        <Button title="Expand" onPress={expandBox} />
      </View>

      <Animated.View
        style={{
          ...styles.secondContainer,
          transform: [{translateX: contentPosition}],
        }}>
        <View style={{...styles.secondBox, backgroundColor: 'blue'}} />
        <View style={{...styles.secondBox, backgroundColor: 'orange'}} />
        <View style={{...styles.secondBox, backgroundColor: 'pink'}} />
        <View style={{...styles.secondBox, backgroundColor: 'lightseagreen'}} />
        <View style={{...styles.secondBox, backgroundColor: 'green'}} />
        <View style={{...styles.secondBox, backgroundColor: 'lightblue'}} />
      </Animated.View>
      <Button title="move content left" onPress={moveContentLeft} />
      <Button title="move content right" onPress={moveContentRight} />
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    height: '50%',
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  box: {
    width: 100,
    height: 50,
    backgroundColor: '#1E96FF',
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  secondContainer: {
    height: 100,
    backgroundColor: 'red',
    flexDirection: 'row',
  },
  secondBox: {
    width: '100%',
    height: 50,
  },
});

export default AnimationsScreen;
