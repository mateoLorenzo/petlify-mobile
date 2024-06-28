import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions} from 'react-native';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';

const GOOGLE_API_KEY = 'AIzaSyCSu-CaK-Oaq7q42s-4GLQEFZCnBZ76MH8';
const {height} = Dimensions.get('window');

interface mapsCoords {
  lat: number;
  lng: number;
}

const NewLocationScreen = () => {
  const [origin, setOrigin] = React.useState({
    latitude: -34.913854,
    longitude: -65.318303,
  });
  const map = React.useRef<MapView | null>(null);
  const navigation = useNavigation();
  const modalHeight = useRef(new Animated.Value(0.95)).current;
  const autocompleteRef = useRef<any>(null);

  useEffect(() => {
    if (autocompleteRef.current) {
      autocompleteRef.current.setAddressText('');
      autocompleteRef.current.focus();
    }
  }, []);

  const toggleModalHeight = (animation: 'expand' | 'reduce') => {
    Animated.timing(modalHeight, {
      toValue: animation === 'expand' ? 0.95 : 0.25,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={map}
        style={styles.map}
        provider={
          Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
        }
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 9.0,
          longitudeDelta: 9.0,
        }}>
        <Marker
          coordinate={origin}
          draggable
          onDragEnd={direction => setOrigin(direction.nativeEvent.coordinate)}
        />
      </MapView>
      <Animated.View
        style={{
          ...styles.modal,
          height: modalHeight.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
          }),
        }}>
        <View style={styles.modalTopLine} />
        <View style={styles.titleRow}>
          <TouchableOpacity onPress={goBack} style={styles.iconContainer}>
            <Icon name={'arrow-back'} size={20} color={'#000'} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Ingrese su direccion</Text>
        </View>
        <GooglePlacesAutocomplete
          placeholder="Buscar"
          ref={autocompleteRef}
          fetchDetails
          enablePoweredByContainer={false}
          onPress={(data, details = null) => {
            const {lat, lng} = details?.geometry.location as mapsCoords;
            toggleModalHeight('reduce');
            setOrigin({
              latitude: lat,
              longitude: lng,
            });
            map.current?.animateToRegion({
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.015,
              longitudeDelta: 0.00821,
            });
          }}
          textInputProps={{
            style: styles.searchInput,
            onFocus: () => toggleModalHeight('expand'),
          }}
          renderRow={item => (
            <>
              <View style={styles.locationIconContainer}>
                <Icon name={'location-sharp'} size={16} color={'#1E96FF'} />
              </View>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </>
          )}
          query={{
            key: GOOGLE_API_KEY,
            language: 'es',
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchInput: {
    borderColor: '#8F8F8F',
    borderWidth: 1,
    width: '100%',
    paddingVertical: 17,
    paddingHorizontal: 20,
    borderRadius: 5,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  locationIconContainer: {
    marginLeft: -10,
    marginRight: 10,
    padding: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 100,
  },
  itemDescription: {
    fontFamily: 'Poppins-Regular',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },
  modal: {
    minHeight: height * 0.25,
    width: '100%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  modalTopLine: {
    width: 80,
    height: 4,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
  },
  titleRow: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    position: 'absolute',
    left: 20,
  },
  modalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
});

export default NewLocationScreen;
