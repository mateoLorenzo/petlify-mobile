import React, {useRef, useState} from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CustomButton} from '../../components/CustomButton';
import {RouteProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from '../../../assets/images/logo.svg';
import LogoBlack from '../../../assets/images/logo-black.svg';
import Cash from '../../../assets/images/cash.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../routes/StackNavigator';

type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  'ConfirmServiceScreen'
>;
type DetailsScreenRouteProp = RouteProp<
  RootStackParams,
  'ConfirmServiceScreen'
>;

type Props = {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
};

const ConfirmServiceScreen: React.FC<Props> = ({navigation, route}) => {
  const selectedPaymentMethod = route.params;
  const {top} = useSafeAreaInsets();
  const [selectedServiceType, setSelectedServiceType] = useState<
    'normal' | 'premium'
  >('normal');

  const [showNormalCardDetail, setShowNormalCardDetail] = useState(false);
  const normalCardOpacity = useRef(new Animated.Value(1)).current;
  const normalDetailOpacity = useRef(new Animated.Value(0)).current;

  const [showPremiumCardDetail, setShowPremiumCardDetail] = useState(false);
  const premiumCardOpacity = useRef(new Animated.Value(1)).current;
  const premiumDetailOpacity = useRef(new Animated.Value(0)).current;

  const toggleNormalCardPrice = (
    animation: 'fadeIn' | 'fadeOut',
    afterAnimation?: () => void,
  ) => {
    Animated.timing(normalCardOpacity, {
      toValue: animation === 'fadeIn' ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => afterAnimation && afterAnimation());
  };
  const toggleNormalCardDetail = (
    animation: 'fadeIn' | 'fadeOut',
    afterAnimation?: () => void,
  ) => {
    Animated.timing(normalDetailOpacity, {
      toValue: animation === 'fadeIn' ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => afterAnimation && afterAnimation());
  };

  const togglePremiumCardPrice = (
    animation: 'fadeIn' | 'fadeOut',
    afterAnimation?: () => void,
  ) => {
    Animated.timing(premiumCardOpacity, {
      toValue: animation === 'fadeIn' ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => afterAnimation && afterAnimation());
  };

  const togglePremiumCardDetail = (
    animation: 'fadeIn' | 'fadeOut',
    afterAnimation?: () => void,
  ) => {
    Animated.timing(premiumDetailOpacity, {
      toValue: animation === 'fadeIn' ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => afterAnimation && afterAnimation());
  };

  const onPressNormalCardInfo = (infoToShow: 'detail' | 'price') => {
    if (infoToShow === 'detail') {
      toggleNormalCardPrice('fadeOut', () => {
        setShowNormalCardDetail(true);
        toggleNormalCardDetail('fadeIn');
      });
    } else {
      toggleNormalCardDetail('fadeOut', () => {
        setShowNormalCardDetail(false);
        toggleNormalCardPrice('fadeIn');
      });
    }
  };
  const onPressPremiumCardInfo = (infoToShow: 'detail' | 'price') => {
    if (infoToShow === 'detail') {
      togglePremiumCardPrice('fadeOut', () => {
        setShowPremiumCardDetail(true);
        togglePremiumCardDetail('fadeIn');
      });
    } else {
      togglePremiumCardDetail('fadeOut', () => {
        setShowPremiumCardDetail(false);
        togglePremiumCardPrice('fadeIn');
      });
    }
  };

  const navigateToAddNewCard = () => {
    if (selectedPaymentMethod === undefined) {
      return;
    }
    navigation.navigate('PaymentSuccessScreen');
  };

  const onPressNormal = () => {
    setSelectedServiceType('normal');
  };

  const onPressPremium = () => {
    setSelectedServiceType('premium');
  };

  const onAddNewPaymentMethod = () => {
    navigation.navigate('SelectPaymentMethodScreen');
  };

  const onModifyPaymentMethod = () => {
    if (selectedPaymentMethod !== undefined) {
      const methodSelected = route.params;
      navigation.navigate('SelectPaymentMethodScreen', methodSelected as never);
    }
  };

  return (
    <View style={{...styles.container}}>
      <View style={{...styles.titleContainer, marginTop: top + 20}}>
        <TouchableOpacity
          style={{...styles.backArrowButton}}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={25} color="#000" />
        </TouchableOpacity>
        <Text style={{...styles.title}}>Tipo de paseo</Text>
      </View>

      <View style={styles.serviceTypeCardsContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressNormal}
          style={{
            ...styles.serviceTypeCard,
            ...(selectedServiceType === 'normal' && styles.shadow),
          }}>
          {showNormalCardDetail === false && (
            <Animated.View
              style={{
                ...styles.cardContentContainer,
                opacity: normalCardOpacity,
              }}>
              <Logo height={50} width={50} />
              <TouchableOpacity
                style={styles.infoButton}
                onPress={() => onPressNormalCardInfo('detail')}>
                <Icon name="information-circle" size={25} color="#1E96FF" />
              </TouchableOpacity>
              <Text style={styles.cardTitle}>Paseo normal</Text>
              <Text style={styles.cardSubtitle}>Mas popular</Text>
              <View style={styles.spacer} />
              <View style={styles.cardBottomSection}>
                <Text style={styles.cardPrice}>$2000/hora</Text>
              </View>
            </Animated.View>
          )}

          {showNormalCardDetail && (
            <Animated.View
              style={{
                ...styles.cardDetailContainer,
                opacity: normalDetailOpacity,
              }}>
              <Text style={styles.cardDetailText}>
                Tu mascota disfrutará de un emocionante paseo junto a otros
                amigos peludos, bajo la supervisión de un paseador profesional.
                ¡Diversión y emoción garantizadas!
              </Text>
              <View style={styles.spacer} />
              <TouchableOpacity onPress={() => onPressNormalCardInfo('price')}>
                <Text style={styles.cardBackButton}>Volver</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressPremium}
          style={{
            ...styles.serviceTypeCard,
            ...styles.leftCard,
            ...(selectedServiceType === 'premium' && styles.shadow),
          }}>
          {showPremiumCardDetail === false && (
            <Animated.View
              style={{
                ...styles.cardContentContainer,
                opacity: premiumCardOpacity,
              }}>
              <LogoBlack height={50} width={50} />
              <TouchableOpacity
                onPress={() => onPressPremiumCardInfo('detail')}
                style={styles.infoButton}>
                <Icon name="information-circle" size={25} color="#000" />
              </TouchableOpacity>
              <Text style={styles.cardTitle}>Paseo premium</Text>
              <Text style={styles.cardSubtitle}>Personalizado</Text>
              <View style={styles.spacer} />

              <View
                style={{
                  ...styles.cardBottomSection,
                  ...styles.backgroundBlack,
                }}>
                <Text style={styles.cardPrice}>$5000/hora</Text>
              </View>
            </Animated.View>
          )}

          {showPremiumCardDetail && (
            <Animated.View
              style={{
                ...styles.cardDetailContainer,
                opacity: premiumDetailOpacity,
              }}>
              <Text style={styles.cardDetailText}>
                Disfruta de un paseo personalizado para tu mascota. Un paseador
                seleccionado se dedicará únicamente a tu mascota, garantizando
                atención total y una experiencia de lujo.
              </Text>
              <View style={styles.spacer} />
              <TouchableOpacity onPress={() => onPressPremiumCardInfo('price')}>
                <Text style={styles.cardBackButton}>Volver</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.spacer} />

      <View style={styles.detailRow}>
        <View style={styles.detailIconContainer}>
          <Icon name={'location-sharp'} size={25} color={'#1E96FF'} />
        </View>
        <View>
          <Text style={styles.detailTitle}>Duracion</Text>
          <Text style={styles.detailSubtitle}>2hs</Text>
        </View>
      </View>
      <View style={styles.detailRow}>
        <View style={styles.detailIconContainer}>
          <Cash height={25} width={25} />
        </View>
        <View>
          <Text style={styles.detailTitle}>Precio final</Text>
          <Text style={styles.detailSubtitle}>
            {selectedServiceType === 'normal' ? '$4.000' : '$10.000'}
          </Text>
        </View>
      </View>

      {selectedPaymentMethod ? (
        <TouchableOpacity
          onPress={onModifyPaymentMethod}
          style={styles.paymentMethodSelectedButton}>
          <selectedPaymentMethod.image height={40} width={40} />
          <Text style={styles.paymentMethodSelectedText}>
            {selectedPaymentMethod.name}
          </Text>
          <View style={styles.spacer} />
          <Icon name="chevron-forward" size={25} color="gray" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onAddNewPaymentMethod}
          style={styles.paymentMethodButton}>
          <Icon
            name="add-outline"
            size={25}
            style={styles.paymentMethodImage}
          />
          <Text style={styles.paymentButtonText}>Agregar método de pago</Text>
        </TouchableOpacity>
      )}

      <CustomButton
        label="Confirmar"
        onPress={navigateToAddNewCard}
        style={{
          ...styles.continueButton,
          ...(selectedPaymentMethod
            ? {backgroundColor: '#1E96FF'}
            : {backgroundColor: 'gray'}),
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
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  backArrowButton: {
    position: 'absolute',
    left: 0,
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
  serviceTypeCardsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  blackColor: {
    color: '#000',
    backgroundColor: '#000',
    borderColor: '#000',
  },
  blackBorder: {
    borderColor: 'lightgray',
  },
  serviceTypeCard: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: '#FFF',
    minHeight: 200,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  cardContentContainer: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 15,
    borderRadius: 10,
    minHeight: 200,
  },
  infoButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftCard: {
    marginLeft: 10,
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginTop: 10,
    color: '#000',
  },
  cardSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginTop: 5,
    color: '#9F9F9F',
  },
  cardBottomSection: {
    width: '100%',
    backgroundColor: '#1E96FF',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

    position: 'absolute',
    bottom: 0,
  },
  cardPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'white',
  },
  cardDetailContainer: {
    padding: 15,
    width: '100%',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  cardDetailText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    textAlign: 'center',
  },
  cardBackButton: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textAlign: 'center',
    color: '#1E96FF',
  },
  backgroundBlack: {
    backgroundColor: '#000',
  },
  colorBlack: {
    color: '#000',
  },
  borderBlack: {
    borderColor: 'lightgray',
  },
  paymentButtonText: {
    fontSize: 14,
    fontWeight: '100',
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  paymentMethodSelectedText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
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
  paymentMethodSelectedButton: {
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 10,
    flexDirection: 'row',
  },
  paymentMethodImage: {
    marginRight: 5,
  },
  spacer: {
    flex: 1,
  },
  detailRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  detailTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#000',
  },
  detailSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#5B5B5B',
  },
  continueButton: {
    height: 55,
    marginBottom: 40,
  },
  shadow: {
    shadowColor: '#1E96FF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    borderRadius: 15,
    borderColor: Platform.OS === 'android' ? '#000' : 'transparent',
  },
  blackShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    borderRadius: 15,
  },
});

export default ConfirmServiceScreen;
