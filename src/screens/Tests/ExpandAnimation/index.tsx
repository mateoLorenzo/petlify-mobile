import React, {useRef} from 'react';
import {Animated, Button, StyleSheet, View} from 'react-native';

const ExpandAnimationScreen = () => {
  const boxWidth = useRef(new Animated.Value(300)).current;

  const expandBox = (duration: number = 500) => {
    Animated.timing(boxWidth, {
      toValue: 200,
      duration,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.screenContainer}>
      <Animated.View
        style={{
          ...styles.box,
          width: boxWidth,
        }}
      />
      <Button
        title="Expand"
        onPress={() => {
          expandBox();
        }}
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
  box: {
    width: 100,
    height: 50,
    backgroundColor: '#1E96FF',
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
});

export default ExpandAnimationScreen;
