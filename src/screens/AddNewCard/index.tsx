import React, {useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomButton} from '../../components/CustomButton';
import CardInput from '../../components/CardInput';
import cardValidator from 'card-validator';

const DismissKeyboard = ({children}: {children: React.ReactNode}) => (
  <TouchableOpacity
    activeOpacity={1}
    style={{flex: 1}}
    onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableOpacity>
);

const AddNewCardScreen = () => {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();

  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardError, setCardError] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [expiryError, setExpiryError] = useState('');
  const [cvvError, setCvvError] = useState('');
  const [nameError, setNameError] = useState('');

  const onPressSaveCard = () => {
    const expiryIsValid = validateExpiry();
    const cvvIsValid = validateCvv();
    const nameIsValid = validateName();
    const cardIsValid = validateCardNumber();

    if (expiryIsValid && cvvIsValid && nameIsValid && cardIsValid) {
      console.log({
        cardNumber,
        cardType,
        expiry,
        cvv,
        name,
      });
      navigation.goBack();
    }
  };

  const validateExpiry = () => {
    const expiryDate = cardValidator.expirationDate(expiry);
    if (!expiryDate.isValid) {
      setExpiryError('Fecha de vencimiento inválida');
      return false;
    } else {
      setExpiryError('');
      return true;
    }
  };

  const validateCvv = () => {
    if (cvv.length < 3) {
      setCvvError('CVV inválido');
      return false;
    }
    setCvvError('');
    return true;
  };

  const validateName = () => {
    if (name.trim().length <= 1) {
      setNameError('Nombre inválido');
      return false;
    }
    setNameError('');
    return true;
  };

  const validateCardNumber = () => {
    const cardInfo = cardValidator.number(cardNumber.replace(/\s/g, ''));
    if (!cardInfo.isValid) {
      setCardError('Número de tarjeta inválido');
      return false;
    }
    setCardError('');
    return true;
  };

  const handleExpiryChange = (text: string) => {
    const formattedText = text.replace(/[^0-9]/g, '');
    if (formattedText.length > 2) {
      setExpiry(`${formattedText.slice(0, 2)}/${formattedText.slice(2, 4)}`);
    } else {
      setExpiry(formattedText);
    }
  };

  const handleCvvChange = (text: string) => {
    setCvv(text.replace(/[^0-9]/g, '').slice(0, 4));
  };

  const handleNameChange = (text: string) => {
    setName(text);
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{...styles.backArrowButton, marginTop: top + 10}}>
          <Icon name="arrow-back" size={25} color="#000" />
        </TouchableOpacity>
        <Text style={{...styles.title, marginTop: top + 10}}>
          Cargar Nueva Tarjeta
        </Text>

        <View style={styles.cardInputContainer}>
          <Text style={styles.inputLabel}>Numero de Tarjeta</Text>
          <CardInput
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            cardType={cardType}
            setCardType={setCardType}
            error={cardError}
            setError={setCardError}
          />
        </View>

        <View style={styles.doubleFieldsContainer}>
          <View style={styles.spacer}>
            <Text style={styles.inputLabel}>Vencimiento</Text>
            <TextInput
              style={styles.cardInput}
              placeholder="MM/YY"
              placeholderTextColor="#9B9B9B"
              value={expiry}
              onChangeText={handleExpiryChange}
              onBlur={validateExpiry}
              keyboardType="numeric"
              maxLength={5}
            />
            {expiryError ? (
              <Text style={styles.errorText}>{expiryError}</Text>
            ) : null}
          </View>
          <View style={styles.cvvInputContainer}>
            <Text style={styles.inputLabel}>CVV</Text>
            <TextInput
              style={styles.cardInput}
              placeholder="123"
              placeholderTextColor="#9B9B9B"
              value={cvv}
              onChangeText={handleCvvChange}
              onBlur={validateCvv}
              keyboardType="numeric"
              maxLength={4}
            />
            {cvvError ? <Text style={styles.errorText}>{cvvError}</Text> : null}
          </View>
        </View>

        <View style={styles.cardInputContainer}>
          <Text style={styles.inputLabel}>Nombre</Text>
          <TextInput
            style={styles.cardInput}
            placeholder="John Wick"
            placeholderTextColor="#9B9B9B"
            value={name}
            onChangeText={handleNameChange}
            onBlur={validateName}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
        </View>

        <View style={styles.spacer} />

        <View style={styles.cardInputContainer}>
          <Text style={styles.inputLabel}>Descripcion (opcional)</Text>
          <TextInput
            style={styles.cardInput}
            placeholder="Ej: Debito Brubank"
            placeholderTextColor="#9B9B9B"
          />
        </View>

        <CustomButton
          label="Guardar Tarjeta"
          onPress={onPressSaveCard}
          style={styles.saveCardButton}
        />
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
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
    fontSize: 22,
    marginTop: 20,
    fontFamily: 'Poppins-Semibold',
    marginBottom: 40,
  },
  cardNumberInput: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: '#A5A5A5',
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'Poppins-Regular',
  },
  cardInputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginBottom: 5,
    color: '#222222',
  },
  cardInput: {
    borderColor: '#A5A5A5',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontFamily: 'Poppins-Regular',
  },
  doubleFieldsContainer: {
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row',
  },
  cvvInputContainer: {
    flex: 1,
    marginLeft: 20,
  },
  spacer: {
    flex: 1,
  },
  saveCardButton: {
    height: 55,
    marginBottom: 40,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});

export default AddNewCardScreen;
