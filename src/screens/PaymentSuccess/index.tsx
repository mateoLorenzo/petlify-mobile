import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomButton} from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const {width} = Dimensions.get('window');
const PaymentSuccessScreen = () => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.animation}
        source={require('../../../assets/animations/party12.json')}
        autoPlay
        speed={0.6}
        loop={false}
      />
      <View style={{...styles.checkContainer, marginTop: top + 20}}>
        <Icon name="checkmark-outline" size={60} color="#FFF" />
      </View>
      <Text style={styles.title}>¡Pago Exitoso!</Text>
      <Text style={styles.priceText}>$4.000</Text>
      <Text style={styles.descriptionMessage}>
        Buscaremos el paseador adecuado para Lucy y te notificaremos en unos
        minutos.
        <Text style={styles.descriptionAlertMessage}>¡Estate Atento!</Text>
      </Text>

      <View style={styles.spacer} />
      <CustomButton
        label="Detalle del Servicio"
        onPress={() => navigation.navigate('ServiceDetailScreen' as never)}
      />
      <CustomButton
        label="Volver al Inicio"
        onPress={() => navigation.navigate('HomeScreen' as never)}
        style={styles.homeButton}
        labelStyle={styles.homeButtonText}
      />
      <View style={styles.securePaymentContainer}>
        <Icon name="shield-checkmark" size={20} color="#8A8A8A" />
        <Text style={styles.securePaymentText}>Pago Seguro</Text>
      </View>
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
  checkContainer: {
    backgroundColor: '#1E96FF',
    padding: 30,
    borderRadius: 100,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 25,
    marginTop: 40,
  },
  priceText: {
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 40,
    paddingVertical: 20,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#1E96FF',
    marginTop: 20,
  },
  descriptionMessage: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginTop: 40,
  },
  descriptionAlertMessage: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  spacer: {
    flex: 1,
  },
  homeButton: {
    backgroundColor: '#FFF',
    borderColor: '#1E96FF',
    borderWidth: 1,
    marginTop: 10,
  },
  homeButtonText: {
    color: '#1E96FF',
  },
  securePaymentContainer: {
    marginBottom: 40,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  securePaymentText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginLeft: 5,
    color: '#8A8A8A',
  },
  animation: {
    width,
    height: '100%',
    position: 'absolute',
    zIndex: -1,
  },
});

export default PaymentSuccessScreen;
