import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions} from 'react-native';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {
  Region,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomButton} from '../../components/CustomButton';
import {mapStyle} from '../../constants';
import axios from 'axios';

const GOOGLE_API_KEY = 'AIzaSyCSu-CaK-Oaq7q42s-4GLQEFZCnBZ76MH8';
const {width} = Dimensions.get('window');

interface mapsCoords {
  lat: number;
  lng: number;
}

const initialLatitude = -34.913854;
const initialLongitude = -65.318303;

const getAddressFromCoordinates = async (
  latitude: number,
  longitude: number,
) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.data.results.length > 0) {
      const data = response.data;
      const address = data.results[0].formatted_address.split(',')[0];
      return address;
    } else {
      console.log('No address found');
    }
  } catch (error) {
    console.log('Error getting address from coordinates', error);
  }
};

const NewLocationScreen = () => {
  const [origin, setOrigin] = useState({
    latitude: initialLatitude,
    longitude: initialLongitude,
  });
  const [userAddress, setUserAddress] = useState({
    fullAddress: '',
    latitude: initialLatitude,
    longitude: initialLongitude,
  });
  const initialRegion = {
    latitude: initialLatitude,
    longitude: initialLongitude,
    latitudeDelta: 9.0,
    longitudeDelta: 9.0,
  };
  const [mapIsVisible, setMapIsVisible] = useState(false);
  const map = useRef<MapView | null>(null);
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
      toValue: animation === 'expand' ? 0.95 : 0.3,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const goBack = () => {
    navigation.goBack();
  };

  const onRegionChangeComplete = async (region: Region) => {
    const {latitude, longitude} = region;
    const addressFromCoords = await getAddressFromCoordinates(
      latitude,
      longitude,
    );
    setOrigin({latitude, longitude});
    setUserAddress({
      ...userAddress,
      latitude,
      longitude,
      fullAddress: addressFromCoords,
    });
  };

  const onChangeText = (text: string) => {
    if (text !== userAddress.fullAddress && mapIsVisible === false) {
      setUserAddress({...userAddress, fullAddress: text});
    }
  };

  const renderRow = (item: any) => {
    const [title, ...rest] = item.description.split(',');
    const description = rest.join(',').trim();

    return (
      <View style={styles.itemRow}>
        <View style={styles.locationIconContainer}>
          <Icon name={'location-sharp'} size={16} color={'#1E96FF'} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text
            style={styles.itemDescription}
            numberOfLines={1}
            ellipsizeMode="tail">
            {description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={
          Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
        }
        customMapStyle={mapStyle}
        ref={map}
        style={styles.map}
        initialRegion={initialRegion}
        onRegionChangeComplete={onRegionChangeComplete}>
        <View style={styles.pinContainer}>
          <Icon name={'location-sharp'} size={40} color={'#1E96FF'} />
        </View>
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
            const fullAddress = details?.formatted_address || '';
            setUserAddress({fullAddress, latitude: lat, longitude: lng});
            toggleModalHeight('reduce');
            setMapIsVisible(true);
            setOrigin({latitude: lat, longitude: lng});
            map.current?.animateToRegion({
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.0015,
              longitudeDelta: 0.0015,
            });
          }}
          textInputProps={{
            style: styles.searchInput,
            onFocus: () => {
              setMapIsVisible(false);
              toggleModalHeight('expand');
            },
            placeholderTextColor: '#8F8F8F',
            autoCorrect: false,
            value: userAddress.fullAddress,
            onChangeText: onChangeText,
          }}
          renderRow={renderRow}
          query={{key: GOOGLE_API_KEY, language: 'es'}}
        />

        <CustomButton
          label="Guardar"
          onPress={() => console.log('User Address:', userAddress)}
          style={styles.saveButton}
          disabled={
            origin.latitude === initialLatitude &&
            origin.longitude === initialLongitude
          }
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
  itemRow: {
    flexDirection: 'row',
    width: width - 70,
    overflow: 'hidden',
    paddingBottom: 1,
  },
  locationIconContainer: {
    marginLeft: 0,
    marginRight: 10,
    padding: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 100,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    width: width - 75 - 40,
  },
  itemTitle: {
    fontFamily: 'Poppins-Medium',
  },
  itemDescription: {
    fontFamily: 'Poppins-Regular',
    color: 'gray',
  },
  modal: {
    minHeight: 260,
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
  saveButton: {
    marginBottom: 40,
  },
  pinContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -40,
  },
});

export default NewLocationScreen;
