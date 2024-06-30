import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {ServiceDoneCard} from '../../components/ServiceDoneCard';
import {schedules as fakeSchedules} from '../../data';

const {width: screenWidth} = Dimensions.get('window');

const ServicesDoneScreen = () => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const onPressContact = () => {
    navigation.navigate('WorkerProfileScreen' as never);
  };

  return (
    <View style={styles.container}>
      <View style={{...styles.titleContainer, marginTop: top + 20}}>
        <Text style={{...styles.title}}>Servicios Realizados</Text>
        <TouchableOpacity style={styles.backIconButton} onPress={goBack}>
          <Icon name="arrow-back" size={25} color="#000" />
        </TouchableOpacity>
      </View>
      <Text style={{...styles.subtitle}}>
        Aqui puedes ver tus servicios realizados
      </Text>
      <FlatList
        data={fakeSchedules}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ServiceDoneCard schedule={item} onPressContact={onPressContact} />
        )}
        contentContainerStyle={styles.cardsFlatListContent}
        style={{...styles.cardsFlatListContainer}}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  titleContainer: {
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  backIconButton: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '100',
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardsFlatListContainer: {
    marginBottom: 40,
    width: '100%',
  },
  cardsFlatListContent: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  serviceDoneCard: {
    width: screenWidth - 40,
    height: 100,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ServicesDoneScreen;
