import {useNavigation} from '@react-navigation/native';
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
import ImagePicker from 'react-native-image-crop-picker';
const myImage = require('../../../assets/images/matumoto.png');
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const ProfileScreen = () => {
  const [showBlackLayer, setShowBlackLayer] = useState(false);
  const [selectedImage, setSelectedImage] = useState(myImage);
  const modalPosition = useRef(new Animated.Value(screenHeight)).current;
  const blackLayerOpacity = useRef(new Animated.Value(0)).current;
  const {navigate} = useNavigation();
  const {top} = useSafeAreaInsets();

  const moveUpModal = () => {
    Animated.timing(modalPosition, {
      toValue: screenHeight / 3,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const moveDownModal = () => {
    Animated.timing(modalPosition, {
      toValue: screenHeight,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setShowBlackLayer(false);
    });
  };

  const showLayerAnimation = () => {
    Animated.timing(blackLayerOpacity, {
      toValue: 0.5,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const hideLayerAnimation = (onFinish?: () => void) => {
    Animated.timing(blackLayerOpacity, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(onFinish);
  };

  const editProfile = () => {
    navigate('ProfileEditScreen' as never);
  };

  const choosePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setSelectedImage(image.path);
    });
  };

  const showConfirmLogout = () => {
    setShowBlackLayer(true);
    showLayerAnimation();
    moveUpModal();
  };

  const hideBlackLayer = () => {
    moveDownModal();
    hideLayerAnimation();
  };

  const logout = () => {
    moveDownModal();
    hideLayerAnimation(() => navigate('loginScreen' as never));
  };

  return (
    <View style={{...styles.container, paddingTop: top}}>
      <Text style={styles.title}>Perfil</Text>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={choosePhotoFromGallery}>
        <Image source={selectedImage} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.usernameTitle}>Mateo Lorenzo</Text>
      <Text style={styles.usernameSubTitle}>Dueño de Lucy</Text>

      <View style={styles.accountInfoContainer}>
        <Text style={styles.accountInfoTitle}>Datos de la cuenta</Text>
        <View style={styles.accountInfoSubContainer}>
          <View style={styles.infoRow}>
            <View style={styles.rowLeftContainer}>
              <Icon name="person-circle-outline" size={25} color="#707070" />
              <Text style={styles.infoRowText}>Mateo Lorenzo</Text>
            </View>
            {/* <Icon name="chevron-forward-outline" size={25} color="#707070" /> */}
          </View>

          <View style={styles.rowsDivisor} />
          <View style={styles.infoRow}>
            <View style={styles.rowLeftContainer}>
              <Icon name="mail-outline" size={25} color="#707070" />
              <Text style={styles.infoRowText}>mateolorenzo.dev@gmail.com</Text>
            </View>
            {/* <Icon name="chevron-forward-outline" size={25} color="#707070" /> */}
          </View>
          <View style={styles.rowsDivisor} />

          <TouchableOpacity style={styles.infoRow} onPress={editProfile}>
            <View style={styles.rowLeftContainer}>
              <Icon name="key-outline" size={25} color="#707070" />
              <Text style={styles.infoRowText}>********</Text>
            </View>
            <Icon name="chevron-forward-outline" size={25} color="#707070" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.logoutContainer}
        onPress={showConfirmLogout}>
        <Icon name="exit-outline" size={25} color="#C1413E" />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>

      {showBlackLayer && (
        <View style={styles.blackLayerContainer}>
          <Animated.View
            style={{...styles.blackLayer, opacity: blackLayerOpacity}}>
            <TouchableOpacity
              style={styles.blackLayerButton}
              activeOpacity={1}
              onPress={hideBlackLayer}
            />
          </Animated.View>
          <Animated.View
            style={{
              ...styles.modalContainer,
              transform: [{translateY: modalPosition}],
            }}>
            <Text style={styles.logoutTitle}>¿Cerrar sesion?</Text>
            <Text style={styles.logoutSubtitle}>
              No te preocupes, guardaremos tus datos para cuando quieras volver
              a ingresar.
            </Text>
            <View style={styles.logoutButtonsContainer}>
              <TouchableOpacity
                onPress={hideBlackLayer}
                style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Salir</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Poppins-SemiBold',
    width: '100%',
    color: '#000',
  },
  imageContainer: {
    width: 130,
    height: 130,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1E96FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  usernameTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    marginTop: 10,
    color: '#000',
    marginBottom: -5,
  },
  usernameSubTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: 'gray',
  },
  accountInfoContainer: {
    width: '100%',
    marginTop: 30,
  },
  accountInfoTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    width: '100%',
    color: '#000',
    marginBottom: 10,
  },
  accountInfoSubContainer: {
    width: '100%',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#D9D9D9',
    paddingHorizontal: 15,
  },
  infoRow: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    overflow: 'hidden',
  },
  infoRowText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginLeft: 10,
    height: 20,
  },
  rowsDivisor: {
    height: 1,
    width: '100%',
    backgroundColor: 'lightgray',
  },
  logoutContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#C1413E',
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoutText: {
    marginLeft: 10,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: '#C1413E',
  },
  blackLayerContainer: {
    position: 'absolute',
    height: screenHeight,
    width: screenWidth,
    alignItems: 'center',
    zIndex: 10,
  },
  blackLayer: {
    position: 'absolute',
    width: screenWidth,
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.5,
  },
  blackLayerButton: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  logoutTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#000',
  },
  logoutSubtitle: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    marginVertical: 10,
  },
  logoutButtonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C1413E',
  },
  cancelButtonText: {
    color: '#C1413E',
    fontFamily: 'Poppins-Medium',
    lineHeight: 15,
    fontSize: 12,
  },
  logoutButton: {
    flex: 1,
    paddingVertical: 13,
    backgroundColor: '#C1413E',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  logoutButtonText: {
    color: '#FFF',
    fontFamily: 'Poppins-Medium',
    lineHeight: 15,
    fontSize: 12,
  },
});

export default ProfileScreen;
