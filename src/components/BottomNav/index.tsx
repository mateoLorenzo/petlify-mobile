// import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const walker = require('../../../assets/images/paseo.png');
const sitter = require('../../../assets/images/cuidado.png');

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const BottomNav = () => {
  const [showBlackLayer, setShowBlackLayer] = useState(false);
  const blackLayerOpacity = useRef(new Animated.Value(0)).current;
  const modalPosition = useRef(new Animated.Value(200)).current;

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

  const onPressHome = () => {};

  return (
    <View style={{...styles.screenContainer, zIndex: showBlackLayer ? 2 : -1}}>
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
            <Text style={styles.serviceTitle}>¿Sale Nuevo Servicio?</Text>
            <Text style={styles.serviceSubtitle}>
              ¡Imagina lo contenta que se pondra Lucy!
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button}>
                <Image source={walker} style={styles.serviceImage} />
                <View style={styles.imageLayerContainer}>
                  <View style={styles.imageBlackLayer} />
                  <Text style={styles.serviceText}>Paseo</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Image source={sitter} style={styles.serviceImage} />
                <View style={styles.imageLayerContainer}>
                  <View style={styles.imageBlackLayer} />
                  <Text style={styles.serviceText}>Cuidado</Text>
                </View>
              </TouchableOpacity>
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
          <Icon name="person-outline" size={25} color="#1E96FF" />
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
  serviceTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#000',
    marginTop: 20,
    marginBottom: -5,
  },
  serviceSubtitle: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    color: '#000',
    fontSize: 14,
    width: '90%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '90%',
    marginVertical: 20,
  },
  button: {
    width: 150,
    height: 150,
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 5,
    elevation: 5,
  },
  serviceImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageLayerContainer: {
    position: 'absolute',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  imageBlackLayer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.3,
    borderRadius: 10,
    position: 'absolute',
  },
  serviceText: {
    zIndex: 199,
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
  },
});

export default BottomNav;
