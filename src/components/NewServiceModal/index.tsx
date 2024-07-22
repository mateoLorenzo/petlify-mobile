/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PetlifyContext} from '../../context/PetlifyContext';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../routes/StackNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
const walker = require('../../../assets/images/paseo.png');
const sitter = require('../../../assets/images/cuidado.png');

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<
  RootStackParams,
  'ServiceRequestScreen'
>;

export const NewServiceModal = () => {
  const navigation = useNavigation<NavigationProp>();
  const blackLayerOpacity = useRef(new Animated.Value(0)).current;
  const modalPosition = useRef(new Animated.Value(screenHeight)).current;
  const {isOpenServiceModal, setIsOpenServiceModal} =
    useContext(PetlifyContext);

  const onPressWalkService = () => {
    hideBlackLayer(() => {
      navigation.navigate('ServiceRequestScreen', {service: 'walk'});
    });
  };

  const onPressCareService = () => {
    hideBlackLayer(() => {
      navigation.navigate('ServiceRequestScreen', {service: 'care'});
    });
  };

  useEffect(() => {
    if (isOpenServiceModal) {
      onPressNew();
    }
    if (!isOpenServiceModal) {
      hideBlackLayer();
    }
  }, [isOpenServiceModal]);

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
      toValue: screenHeight - 360,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const hideModalAnimation = (onFinish?: () => void) => {
    Animated.timing(modalPosition, {
      toValue: screenHeight - 100,
      duration: 400,
      useNativeDriver: true,
    }).start(onFinish);
  };

  const onPressNew = () => {
    showLayerAnimation();
    showModalAnimation();
  };

  const hideBlackLayer = (onFinish?: () => void) => {
    hideModalAnimation();
    hideLayerAnimation(() => {
      setIsOpenServiceModal(false);
      onFinish && onFinish();
    });
  };

  return isOpenServiceModal ? (
    <View style={styles.mainContainer}>
      <Animated.View
        style={{...styles.blackLayerContainer, opacity: blackLayerOpacity}}>
        <TouchableOpacity
          style={styles.flex1}
          activeOpacity={1}
          onPress={() => hideBlackLayer()}
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
          <TouchableOpacity style={styles.button} onPress={onPressWalkService}>
            <Image source={walker} style={styles.serviceImage} />
            <View style={styles.imageLayerContainer}>
              <View style={styles.imageBlackLayer} />
              <Text style={styles.serviceText}>Paseo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onPressCareService}>
            <Image source={sitter} style={styles.serviceImage} />
            <View style={styles.imageLayerContainer}>
              <View style={styles.imageBlackLayer} />
              <Text style={styles.serviceText}>Cuidado</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: screenWidth,
    height: screenHeight - 100,
    position: 'absolute',
    overflow: 'hidden',
  },
  blackLayerContainer: {
    width: screenWidth,
    height: screenHeight - 100,
    position: 'absolute',
    backgroundColor: '#000',
    zIndex: 2,
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
    width: screenWidth,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: 260,
    zIndex: 3,
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
    marginTop: 5,
    marginBottom: 20,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
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
