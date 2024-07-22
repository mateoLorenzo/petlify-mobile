import React, {useContext} from 'react';
import {FlatList, Platform, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SadDog from '../../../assets/images/sad-dog.svg';
import {CustomButton} from '../../components/CustomButton';
import {schedules as fakeSchedules} from '../../data';
import {ServiceCard} from '../../components/ServiceCard';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../routes/StackNavigator';
import {PetlifyContext} from '../../context/PetlifyContext';

type PetDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  'ServiceRequestScreen'
>;

type Props = {
  navigation: PetDetailScreenNavigationProp;
};

const SchedulesScreen: React.FC<Props> = ({navigation}) => {
  const {top: marginTop} = useSafeAreaInsets();

  const scheduledWalks = Number(1);
  const scheduledCares = Number(0);

  const userHasSchedules = scheduledWalks > 0 && scheduledCares > 0;

  const {setIsOpenServiceModal} = useContext(PetlifyContext);

  const onPressNew = () => {
    setIsOpenServiceModal(true);
  };

  return (
    <View style={styles.container}>
      <Text style={{...styles.title, marginTop: marginTop + 20}}>
        Mis Agendas
      </Text>
      {userHasSchedules ? (
        <Text style={styles.subtitle}>
          Aqui podrás ver tus servicios agendados y el historial de los que ya
          haz realizado
        </Text>
      ) : (
        <Text style={styles.subtitle}>
          Aqui puedes ver tus servicios agendados
        </Text>
      )}

      {scheduledWalks === 0 && scheduledCares === 0 ? (
        <>
          <SadDog
            height={200}
            width={200}
            fill={'#1E96FF'}
            style={styles.sadDogImage}
          />
          <Text style={styles.noSchedulesTitle}>¡No Tienes Agendas!</Text>
          <Text style={styles.noSchedulesSubtitle}>
            Coordina de forma facil y rapida el proximo paseo o cuidado para tu
            mascota
          </Text>
        </>
      ) : (
        <FlatList
          data={fakeSchedules}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <ServiceCard schedule={item} />}
          contentContainerStyle={styles.cardsFlatListContent}
          style={styles.cardsFlatListContainer}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
        />
      )}

      <View style={styles.buttonsContainer}>
        <CustomButton
          containerStyle={styles.servicesDoneButtonContainer}
          style={styles.servicesDoneButton}
          labelStyle={styles.servicesDoneButtonText}
          label="Realizados (9)"
          onPress={() => navigation.navigate('ServicesDoneScreen' as never)}
        />
        <CustomButton
          containerStyle={styles.newServiceButtonContainer}
          style={styles.newServiceButton}
          labelStyle={styles.newServiceButtonText}
          label="Agendar servicio"
          onPress={onPressNew}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    width: '100%',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '100',
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginBottom: 10,
    width: '100%',
    marginTop: Platform.OS === 'android' ? -5 : 0,
  },
  sadDogImage: {
    marginTop: 50,
  },
  noSchedulesTitle: {
    fontSize: 18,
    marginTop: -40,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  noSchedulesSubtitle: {
    fontSize: 12,
    fontWeight: '100',
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'center',
    marginTop: 5,
    width: '80%',
  },
  cardsFlatListContainer: {
    marginBottom: 10,
    width: '100%',
  },
  cardsFlatListContent: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  servicesDoneButtonContainer: {
    flex: 1,
    marginRight: 10,
  },
  servicesDoneButton: {
    height: 55,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderColor: '#1E96FF',
    borderWidth: 1,
  },
  servicesDoneButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#1E96FF',
  },
  newServiceButtonContainer: {
    flex: 1,
  },
  newServiceButton: {
    height: 55,
    marginBottom: 10,
  },
  newServiceButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});

export default SchedulesScreen;
