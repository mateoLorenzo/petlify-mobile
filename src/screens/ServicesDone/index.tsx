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

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const {width: screenWidth} = Dimensions.get('window');

const ServiceDoneCard = () => {
  return (
    <View style={styles.serviceDoneCard}>
      <Text>Service Done</Text>
    </View>
  );
};

const ServicesDoneScreen = () => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
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
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ServiceDoneCard}
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
  },
  titleContainer: {
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontFamily: 'Poppins-Semibold',
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
