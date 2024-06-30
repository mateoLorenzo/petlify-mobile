import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import cardValidator from 'card-validator';
import CreditCard from '../../../assets/images/credit-card.svg';
import Visa from '../../../assets/images/visa.svg';
import Mastercard from '../../../assets/images/mastercard2.svg';
import Amex from '../../../assets/images/amex2.svg';

interface Props {
  cardNumber: string;
  setCardNumber: (cardNumber: string) => void;
  cardType: string;
  setCardType: (cardType: string) => void;
  error: string;
  setError: (error: string) => void;
}

export const CardInput = ({
  cardNumber,
  setCardNumber,
  cardType,
  setCardType,
  error,
  setError,
}: Props) => {
  const formatCardNumber = (number: string) => {
    return number
      .replace(/\s?/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };

  const handleCardNumberChange = (number: string) => {
    const formattedNumber = formatCardNumber(number);
    const digitsOnly = formattedNumber.replace(/\s/g, '');

    const cardInfo = cardValidator.number(digitsOnly);
    const maxLength = cardInfo.card?.lengths
      ? Math.max(...cardInfo.card.lengths)
      : 19;

    if (digitsOnly.length > maxLength) {
      setError('Número de tarjeta demasiado largo');
      return;
    }

    if (cardInfo.isValid || digitsOnly.length < maxLength) {
      setError('');
    } else {
      setError('Número de tarjeta inválido');
    }

    setCardNumber(formattedNumber);
    setCardType(cardInfo.card ? cardInfo.card.type : '');
  };

  const renderCardIcon = (type: string) => {
    if (type === 'visa') {
      return <Visa height={45} width={45} style={styles.cardIcon} />;
    }
    if (type === 'mastercard') {
      return <Mastercard height={30} width={30} style={styles.cardIcon} />;
    }
    if (type === 'american-express') {
      return <Amex height={30} width={30} style={styles.cardIcon} />;
    }
    return <CreditCard height={30} width={30} style={styles.cardIcon} />;
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.cardInput}
          placeholder="Card Number"
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={handleCardNumberChange}
          maxLength={19 + 4} // Max length considering spaces
        />
        {renderCardIcon(cardType)}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  cardInput: {
    borderColor: '#A5A5A5',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontFamily: 'Poppins-Regular',
  },
  cardIcon: {
    position: 'absolute',
    right: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});

export default CardInput;
