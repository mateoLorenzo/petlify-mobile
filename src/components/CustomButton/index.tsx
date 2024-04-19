import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import {CustomSpinner} from '../Spinner';
import {useAnimation} from '../../hooks/useAnimation';

interface Props {
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const CustomButton = ({
  onPress,
  disabled,
  style,
  label,
  labelStyle,
  containerStyle,
}: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    textPosition,
    textOpacity,
    loaderOpacity,
    loaderPosition,
    moveTextUP,
    fadeOutButtonText,
    fadeInLoader,
    moveLoaderUP,
  } = useAnimation();

  const moveTextAndShowSpinner = () => {
    moveTextUP(-50);
    fadeOutButtonText();
    fadeInLoader();
    moveLoaderUP(0);
  };

  return (
    <View style={[styles.buttonContainer, containerStyle]}>
      <TouchableOpacity
        disabled={disabled || isLoading}
        activeOpacity={0.8}
        style={[styles.button, style]}
        onPress={() => {
          setIsLoading(true);
          moveTextAndShowSpinner();
          onPress();
        }}>
        <Animated.Text
          style={[
            {
              ...styles.buttonText,
              transform: [{translateY: textPosition}],
              opacity: textOpacity,
            },
            labelStyle,
          ]}>
          {label || 'Button'}
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
  buttonContainer: {
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 70,
    backgroundColor: '#1E96FF',
    borderRadius: 5,
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
