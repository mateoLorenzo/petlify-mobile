import React from 'react';
import {
  Dimensions,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_LAT = 28.46254;
const INITIAL_LNG = -81.397272;
const INITIAL_POSITION = {
  latitude: INITIAL_LAT,
  longitude: INITIAL_LNG,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const GOOGLE_API_KEY = 'AIzaSyCSu-CaK-Oaq7q42s-4GLQEFZCnBZ76MH8';

const NewLocationScreen = () => {
  const [searchText, setSearchText] = React.useState('');
  const [results, setResults] = React.useState<any>();
  const map = React.useRef<MapView | null>(null);

  const searchPlaces = async () => {
    if (!searchText.trim().length) {
      return;
    }
    const googleApisURL =
      'https://maps.googleapis.com/maps/api/place/textsearch/json';
    const input = searchText.trim();
    const location = `${INITIAL_LAT},${INITIAL_LNG}&radius=5000`;

    const url = `${googleApisURL}?query=${input}&location=${location}&key=${GOOGLE_API_KEY}`;

    try {
      const resp = await fetch(url);
      const json = await resp.json();
      if (json && json.results && json.results.length) {
        const coords = [];
        for (const item of json.results) {
          coords.push({
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
          });
        }
        setResults(json.results);
        if (coords.length) {
          map.current?.fitToCoordinates(coords, {
            edgePadding: {
              top: 50,
              right: 50,
              bottom: 50,
              left: 50,
            },
            animated: true,
          });
          Keyboard.dismiss();
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={map}
        style={styles.map}
        provider={
          Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
        }
        region={{
          latitude: -35.441722,
          longitude: -58.819361,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {results &&
          results.length &&
          results.map((item, i) => {
            const coord = {
              latitude: item.geometry.location.lat,
              longitude: item.geometry.location.lng,
            };
            return (
              <Marker
                key={`search-item${i}`}
                coordinate={coord}
                // title={item.name}
                title={item.name}
                description={''}
              />
            );
          })}
      </MapView>
      <View style={styles.searchInputContainer}>
        <TextInput
          placeholder="Search place"
          autoCapitalize="sentences"
          style={styles.searchInput}
          onChangeText={setSearchText}
          value={searchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchPlaces}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
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
