import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomButton} from '../../components/CustomButton';
import Logo from '../../../assets/images/logo.svg';
import Cash from '../../../assets/images/cash.svg';

const ServiceDetailScreen = () => {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();

  const onPressBackHome = () => {
    navigation.navigate('HomeScreen' as never);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{...styles.backArrowButton, marginTop: top + 10}}>
        <Icon name="arrow-back" size={25} color="#000" />
      </TouchableOpacity>
      <Text style={{...styles.title, marginTop: top + 10}}>Detalles</Text>
      <View style={styles.rowContainer}>
        <View style={styles.detailIconContainer}>
          <Logo height={20} width={20} />
        </View>
        <View>
          <Text style={styles.rowTitle}>Mascota</Text>
          <Text style={styles.rowValue}>Lucy</Text>
        </View>
      </View>
      <View style={styles.rowDivisor} />
      <View style={styles.rowContainer}>
        <View style={styles.detailIconContainer}>
          <Icon name={'time'} size={25} color={'#1E96FF'} />
        </View>
        <View>
          <Text style={styles.rowTitle}>Fecha</Text>
          <Text style={styles.rowValue}>Lunes 19/05 - 16:00hs a 18:00hs</Text>
        </View>
      </View>
      <View style={styles.rowDivisor} />
      <View style={styles.rowContainer}>
        <View style={styles.detailIconContainer}>
          <Icon name={'location-sharp'} size={25} color={'#1E96FF'} />
        </View>
        <View>
          <Text style={styles.rowTitle}>Direccion</Text>
          <Text style={styles.rowValue}>
            Belgrano 2662, Mar del Plata, Buenos Aires
          </Text>
        </View>
      </View>
      <View style={styles.rowDivisor} />
      <View style={styles.rowContainer}>
        <View style={styles.detailIconContainer}>
          <Cash width={25} height={25} color={'#1E96FF'} />
        </View>
        <View>
          <Text style={styles.rowTitle}>Precio final</Text>
          <Text style={styles.rowValue}>$4.000</Text>
        </View>
      </View>

      <View style={styles.spacer} />
      <CustomButton
        label="Volver al inicio"
        onPress={onPressBackHome}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  backArrowButton: {
    position: 'absolute',
    left: 20,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    fontFamily: 'Poppins-Semibold',
    marginBottom: 10,
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  detailIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#F0F0F0',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10,
  },
  rowTitle: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Poppins-Medium',
  },
  rowValue: {
    fontSize: 14,
    color: '#5B5B5B',
    fontFamily: 'Poppins-Regular',
  },
  rowDivisor: {
    height: 1,
    width: '100%',
    backgroundColor: '#BDBDBD',
  },
  spacer: {
    flex: 1,
  },
  button: {
    marginBottom: 40,
  },
});

export default ServiceDetailScreen;
