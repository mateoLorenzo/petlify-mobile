import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAnimation} from '../../../hooks/useAnimation';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const data = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
];

const services = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const itemToRender = (item: any, index: number) => {
  const marginRight = index % 2 === 0 ? screenWidth * 0.06 : 0;
  return (
    <TouchableOpacity
      style={{
        marginRight,
        ...styles.serviceProviderProfile,
      }}
    />
  );
};

const renderService = (item: number) => (
  <TouchableOpacity key={item.toString()} style={styles.serviceButton}>
    <Text style={styles.serviceButtonText}>Servicio {item}</Text>
  </TouchableOpacity>
);

const ServicesDoneScreen = () => {
  const [walkersAreShown, setWalkersAreShown] = useState(true);

  const {top} = useSafeAreaInsets();
  const {
    moveButton,
    moveWalkersContainer,
    moveServicesContainer,
    servicesPosition,
    buttonPosition,
    walkersPosition,
  } = useAnimation();

  const adjustScreenContent = () => {
    moveButton(walkersAreShown);
    moveWalkersContainer(walkersAreShown);
    moveServicesContainer(walkersAreShown);
  };

  const onMainButtonPress = () => {
    adjustScreenContent();
    setWalkersAreShown(prev => {
      return !prev;
    });
  };

  const mainButtonText = walkersAreShown
    ? 'Ver servicios realizados'
    : 'Ver paseadores disponibles';

  const customStyles = {
    servicesContainer: {
      ...styles.servicesContainer,
      transform: [{translateY: servicesPosition}],
      top,
    },
    topButtonContainer: {
      ...styles.topButtonContainer,
      transform: [{translateY: buttonPosition}],
    },
    flatListContainer: {
      ...styles.flatListContainer,
      transform: [{translateY: walkersPosition}],
    },
  };
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Animated.View style={customStyles.servicesContainer}>
        <FlatList
          data={services}
          keyExtractor={item => item.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => renderService(item)}
          contentContainerStyle={styles.itemsContainer}
        />
      </Animated.View>

      <Animated.View style={customStyles.topButtonContainer}>
        <TouchableOpacity style={styles.topButton} onPress={onMainButtonPress}>
          <Text style={styles.buttonText}>{mainButtonText}</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={customStyles.flatListContainer}>
        <FlatList
          data={data}
          keyExtractor={item => item.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({item, index}) => itemToRender(item, index)}
          contentContainerStyle={styles.itemsContainer}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  servicesContainer: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight * 0.78,
  },
  serviceButton: {
    width: screenWidth * 0.9,
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'grey',
  },
  serviceButtonText: {
    fontSize: 18,
    color: 'white',
  },
  topButtonContainer: {
    zIndex: 99,
  },
  topButton: {
    borderWidth: 1,
    padding: 20,
    width: screenWidth * 0.9,
    alignSelf: 'center',
    borderRadius: 5,
    borderColor: '#676767',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#676767',
  },
  flatListContainer: {
    marginTop: 20,
    flex: 1,
  },
  itemsContainer: {
    marginTop: 10,
    paddingHorizontal: screenWidth * 0.05,
  },
  serviceProviderProfile: {
    width: screenWidth * 0.42,
    height: screenWidth * 0.42,
    backgroundColor: 'grey',
    borderRadius: 10,
    marginBottom: 20,
  },
  bottomButton: {
    borderWidth: 1,
    padding: 20,
    width: screenWidth * 0.9,
    alignSelf: 'center',
    borderRadius: 5,
    borderColor: '#676767',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
export default ServicesDoneScreen;
