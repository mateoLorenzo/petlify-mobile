import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CustomButton} from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RadioCard} from '../../components/RadioCard';

const addCard = require('../../../assets/images/new-card.png');
const mercadoPago = require('../../../assets/images/mercado-pago.png');

const paymentMethods = [
  {name: 'Tarjeta debito/credito', image: addCard},
  {name: 'MercadoPago', image: mercadoPago},
];

const SelectPaymentMethodScreen = () => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();

  const [selectedMethodIndex, setSelectedMethodIndex] = useState<number | null>(
    null,
  );

  const handleSelect = (index: number) => {
    setSelectedMethodIndex(index);
  };

  const navigateToAddNewCard = () => {
    navigation.navigate('AddNewCardScreen' as never);
  };

  return (
    <View style={{...styles.container}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{...styles.backArrowButton, marginTop: top + 10}}>
        <Icon name="arrow-back" size={25} color="#000" />
      </TouchableOpacity>
      <Text style={{...styles.title, marginTop: top + 10}}>Metodo de Pago</Text>
      <Text style={styles.subtitle}>¡Elige tu metodo de pago mas comodo!</Text>

      {paymentMethods.map((method, index) => (
        <RadioCard
          key={index}
          name={method.name}
          selected={selectedMethodIndex === index}
          onSelect={handleSelect}
          index={index}
          imageURL={method.image}
          cardType="pet"
          imageStyles={styles.paymentMethodImage}
        />
      ))}

      <View style={styles.spacer} />

      <CustomButton
        label="Continuar"
        onPress={navigateToAddNewCard}
        style={styles.continueButton}
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
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: '100',
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginBottom: 20,
  },
  paymentMethodImage: {
    width: 24,
    height: 24,
    marginVertical: 10,
    marginLeft: 10,
  },
  spacer: {
    flex: 1,
  },
  continueButton: {
    height: 55,
    marginBottom: 40,
  },
});

export default SelectPaymentMethodScreen;
