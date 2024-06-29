/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {LogBox, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CustomButton} from '../../components/CustomButton';
import {RouteProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RadioCard} from '../../components/RadioCard';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../routes/StackNavigator';

import Visa from '../../../assets/images/visa.svg';
import Mastercard from '../../../assets/images/mastercard2.svg';
import Amex from '../../../assets/images/amex2.svg';
import CreditCard from '../../../assets/images/credit-card.svg';

import MercadoPago from '../../../assets/images/mercadoPago.svg';
import {PaymentMethod} from '../../interfaces';

const initialPaymentMethods: PaymentMethod[] = [
  {name: 'MercadoPago', image: MercadoPago, description: 'Mas elegida'},
];
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  'SelectPaymentMethodScreen'
>;
type DetailsScreenRouteProp = RouteProp<
  RootStackParams,
  'SelectPaymentMethodScreen'
>;

type Props = {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
};

const SelectPaymentMethodScreen: React.FC<Props> = ({navigation, route}) => {
  const {top} = useSafeAreaInsets();

  const [selectedMethodIndex, setSelectedMethodIndex] = useState<number | null>(
    null,
  );
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    ...initialPaymentMethods,
  ]);

  const getCardIcon = (type: string) => {
    if (type === 'visa') {
      return Visa;
    }
    if (type === 'mastercard') {
      return Mastercard;
    }
    if (type === 'american-express') {
      return Amex;
    }
    return CreditCard;
  };

  const addNewCard = () => {
    if (!route.params) {
      return;
    }

    const cardAlreadyExists = paymentMethods.some(
      method => method.name === route.params?.name,
    );

    if (cardAlreadyExists) {
      const index = paymentMethods.findIndex(
        method => method.name === route.params?.name,
      );
      setSelectedMethodIndex(index);
      return;
    }
    const {cardNumber, cardType, description} = route.params;
    const newCard = {
      name: description || cardNumber,
      image: getCardIcon(cardType),
      description: description ? cardNumber : undefined,
    };
    setPaymentMethods([...paymentMethods, newCard]);
    setSelectedMethodIndex(paymentMethods.length);
  };

  useEffect(() => {
    addNewCard();
  }, [route.params]);

  const handleSelect = (index: number) => {
    setSelectedMethodIndex(index);
  };

  const navigateToAddNewCard = () => {
    navigation.navigate('AddNewCardScreen');
  };

  const confirmPaymentMethod = () => {
    if (selectedMethodIndex === null) {
      return;
    }
    const selectedCard = paymentMethods[selectedMethodIndex];
    navigation.navigate('ConfirmServiceScreen', selectedCard);
  };

  return (
    <View style={{...styles.container}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{...styles.backArrowButton, marginTop: top + 20}}>
        <Icon name="arrow-back" size={25} color="#000" />
      </TouchableOpacity>
      <Text style={{...styles.title, marginTop: top + 20}}>Metodo de Pago</Text>
      <Text style={styles.subtitle}>Elige tu metodo de pago mas comodo</Text>

      {paymentMethods.map((method, index) => (
        <RadioCard
          key={index}
          name={method.name}
          selected={selectedMethodIndex === index}
          onSelect={handleSelect}
          index={index}
          SvgIcon={method.image}
          cardType="payment"
          imageStyles={styles.paymentMethodImage}
          imageURL={undefined}
          locationDescription={method.description}
        />
      ))}

      <View style={styles.spacer} />

      <TouchableOpacity
        onPress={navigateToAddNewCard}
        style={styles.paymentMethodButton}>
        <Icon
          name="add-outline"
          size={25}
          style={styles.addPaymentMethodImage}
        />
        <Text style={styles.paymentButtonText}>Tarjeta Debito/Credito</Text>
      </TouchableOpacity>

      <CustomButton
        label="Continuar"
        onPress={confirmPaymentMethod}
        style={{
          ...styles.continueButton,
          ...(selectedMethodIndex === null ? {backgroundColor: 'gray'} : {}),
        }}
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
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
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
  paymentMethodButton: {
    borderWidth: 1,
    borderColor: '#000',
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginVertical: 10,
    flexDirection: 'row',
  },
  addPaymentMethodImage: {
    marginRight: 5,
  },
  paymentButtonText: {
    fontSize: 14,
    fontWeight: '100',
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  spacer: {
    flex: 1,
  },
  continueButton: {
    height: 55,
    marginBottom: 40,
  },
  shadow: {
    shadowColor: '#ADADAD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 2,
    shadowRadius: 3,
    borderRadius: 10,
  },
});

export default SelectPaymentMethodScreen;
