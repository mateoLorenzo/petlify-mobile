/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  StyleSheet,
  TextStyle,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {grayOrBlue} from '../../constants';

interface Props {
  style?: TextStyle;
  startTimer?: boolean;
}

const CountdownTimer = ({style, startTimer}: Props) => {
  const [time, setTime] = useState(30);
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);
  const [resendTextColor, setResendTextColor] = useState<grayOrBlue>('#9B9B9B');
  const timerOpacity = useRef(new Animated.Value(1)).current;

  const fadeOutTimer = () => {
    Animated.timing(timerOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeInTimer = () => {
    Animated.timing(timerOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (startTimer) {
      fadeInTimer();
      setResendTextColor('#9B9B9B');
      if (timer) {
        clearInterval(timer);
      }
      setTime(30);
      const newTimer = setInterval(tick, 1000);
      setTimer(newTimer);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [startTimer]);

  const tick: () => void = () => {
    setTime(prevTime => {
      if (prevTime === 0) {
        setResendTextColor('#1E96FF');
        fadeOutTimer();
        if (timer) {
          clearInterval(timer);
        }
        return 0;
      }
      return prevTime - 1;
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
  };

  return (
    <View style={styles.resendCodeContainer}>
      <TouchableOpacity disabled={time > 0}>
        <Text style={{...styles.resendCodeText, color: resendTextColor}}>
          Reenviar codigo
        </Text>
      </TouchableOpacity>
      <Animated.Text
        style={{
          ...styles.timer,
          opacity: timerOpacity,
          ...style,
        }}>
        {formatTime(time)}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  resendCodeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  resendCodeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  timer: {
    fontSize: 14,
    marginLeft: 5,
    fontFamily: 'Poppins-Medium',
    color: '#1E96FF',
  },
});

export default CountdownTimer;
