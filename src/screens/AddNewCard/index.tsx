import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomButton} from '../../components/CustomButton';

const AddNewCardScreen = () => {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();

  const onPressSaveCard = () => {
    navigation.goBack();
  };

  return (
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
        <TextInput
          style={styles.cardInput}
          placeholder="1234 5678 2468 1357"
          placeholderTextColor="#9B9B9B"
        />
      </View>
      <View style={styles.cardInputContainer}>
        <Text style={styles.inputLabel}>Nombre</Text>
        <TextInput
          style={styles.cardInput}
          placeholder="John Wick"
          placeholderTextColor="#9B9B9B"
        />
      </View>

      <View style={styles.doubleFieldsContainer}>
        <View style={styles.spacer}>
          <Text style={styles.inputLabel}>Vencimiento</Text>
          <TextInput
            style={styles.cardInput}
            placeholder="11/25"
            placeholderTextColor="#9B9B9B"
          />
        </View>
        <View style={styles.cvvInputContainer}>
          <Text style={styles.inputLabel}>CVV</Text>
          <TextInput
            style={styles.cardInput}
            placeholder="123"
            placeholderTextColor="#9B9B9B"
          />
        </View>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    fontSize: 22,
    marginTop: 20,
    fontFamily: 'Poppins-Semibold',
    marginBottom: 40,
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
});

export default AddNewCardScreen;
