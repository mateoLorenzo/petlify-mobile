import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

const GOOGLE_API_KEY = 'AIzaSyCSu-CaK-Oaq7q42s-4GLQEFZCnBZ76MH8';

interface mapsCoords {
  lat: number;
  lng: number;
}

const NewLocationScreen = () => {
  const [origin, setOrigin] = React.useState({
    latitude: -35.441684,
    longitude: -58.819489,
  });
  const map = React.useRef<MapView | null>(null);

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
          latitudeDelta: 0.035,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={origin}
          draggable
          onDragEnd={direction => setOrigin(direction.nativeEvent.coordinate)}
        />
      </MapView>
      <View style={styles.searchInputContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails
          enablePoweredByContainer={false}
          onPress={(data, details = null) => {
            const {lat, lng} = details?.geometry.location as mapsCoords;
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
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: 'en',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchInputContainer: {
    position: 'absolute',
    top: 40,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    padding: 10,
    borderRadius: 5,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  searchButton: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'lightseagreen',
    borderRadius: 5,
  },
  searchButtonText: {
    fontFamily: 'Poppins-Regular',
    color: '#FFF',
  },
});

export default NewLocationScreen;
