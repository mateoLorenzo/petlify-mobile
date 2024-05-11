import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const BottomNav = () => {
  const [showBlackLayer, setShowBlackLayer] = useState(false);
  const blackLayerOpacity = useRef(new Animated.Value(0)).current;
  const modalPosition = useRef(new Animated.Value(200)).current;

  const {navigate} = useNavigation();

  const showLayerAnimation = () => {
    Animated.timing(blackLayerOpacity, {
      toValue: 0.5,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  const hideLayerAnimation = (onFinish?: () => void) => {
    Animated.timing(blackLayerOpacity, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start(onFinish);
  };
  const showModalAnimation = () => {
    Animated.timing(modalPosition, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  const hideModalAnimation = (onFinish?: () => void) => {
    Animated.timing(modalPosition, {
      toValue: screenHeight,
      duration: 350,
      useNativeDriver: true,
    }).start(onFinish);
  };

  const onPressNew = () => {
    setShowBlackLayer(true);
    showLayerAnimation();
    showModalAnimation();
  };

  const hideBlackLayer = () => {
    hideModalAnimation();
    hideLayerAnimation(() => setShowBlackLayer(false));
  };

  const onPressHome = () => {
    navigate('HomeScreen' as never);
  };

  return (
    <View style={styles.screenContainer}>
      {showBlackLayer && (
        <>
          <Animated.View
            style={{...styles.blackLayerContainer, opacity: blackLayerOpacity}}>
            <TouchableOpacity
              style={styles.flex1}
              activeOpacity={1}
              onPress={hideBlackLayer}
            />
          </Animated.View>
          <Animated.View
            style={{
              ...styles.modalContainer,
              transform: [{translateY: modalPosition}],
            }}>
            <View style={styles.closerBar} />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button} />
              <TouchableOpacity style={styles.button} />
            </View>
          </Animated.View>
        </>
      )}

      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={onPressHome}>
          <Icon name="home-outline" size={25} color="#707070" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="calendar-outline" size={25} color="#707070" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={onPressNew}>
          <Icon name="add-outline" size={25} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="paw-outline" size={25} color="#707070" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="person-outline" size={25} color="#707070" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    width: screenWidth,
    height: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
  },
  blackLayerContainer: {
    flex: 1,
    width: screenWidth,
    backgroundColor: '#000',
    position: 'absolute',
    height: '100%',
  },
  blackLayer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    zIndex: 10,
  },
  flex1: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    height: 200,
    alignItems: 'center',
  },
  footerContainer: {
    width: screenWidth,
    height: 80,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: 'lightgray',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#1E96FF',
    padding: 15,
    borderRadius: 100,
  },
  closerBar: {
    width: 100,
    height: 5,
    backgroundColor: 'lightgray',
    borderRadius: 100,
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 20,
  },
  button: {
    width: 150,
    height: 150,
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    marginHorizontal: 5,
  },
});

export default BottomNav;
