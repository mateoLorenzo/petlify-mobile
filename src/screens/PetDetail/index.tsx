import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ImageSourcePropType,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PetHome from '../../../assets/images/pet-house.svg';
import {CustomButton} from '../../components/CustomButton';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {supabase} from '../../lib/supabase';
import {Pet} from '../../interfaces';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabParams} from '../../routes/BottomTabNavigator';
import {RootStackParams} from '../../routes/StackNavigator';
import {PetCard} from '../../components/PetCard';
import {styles} from './styles';

type PetDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  'RegisterPetScreen'
>;
type PetDetailScreenRouteProp = RouteProp<BottomTabParams, 'PetDetailScreen'>;

type Props = {
  navigation: PetDetailScreenNavigationProp;
  route: PetDetailScreenRouteProp;
  name: string;
  years: number;
  gender: string;
  breed: string;
  image: ImageSourcePropType;
};

const PetDetailScreen: React.FC<Props> = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  const onPressEdit = (pet: Pet) => {
    navigation.navigate('RegisterPetScreen', {actionType: 'update', pet});
  };

  const onPressRegisterPet = () => {
    navigation.navigate('RegisterPetScreen', {actionType: 'register'});
  };
  const getPets = async () => {
    const ownerID = '17e9b275-fcb3-4391-99ab-54f299a969bd'; //TODO: Get ownerID from data in store

    const {data, error} = await supabase
      .from('pets')
      .select('*')
      .eq('owner_id', ownerID);

    if (error) {
      return Alert.alert('Error', error.message);
    }

    setPets(data as Pet[]);
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      console.log('inside MyMascotas');
      getPets();
    }, []),
  );

  return (
    <View style={{...styles.container, paddingTop: top + 20}}>
      <Text style={styles.title}>Mis Mascotas</Text>
      <Text style={styles.subtitle}>
        Aqui puedes ver tus mascotas registradas
      </Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="gray" />
        </View>
      ) : pets.length === 0 ? (
        <>
          <PetHome height={200} width={200} style={{marginTop: 40}} />
          <Text style={styles.registerPetTitle}>¡Registra tu Mascota!</Text>
          <Text style={styles.registerPetSubtitle}>
            Coordina de forma facil y rapida el proximo paseo o cuidado para tu
            mascota
          </Text>
        </>
      ) : (
        <FlatList
          data={pets}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <PetCard onPressEdit={() => onPressEdit(item)} {...item} />
          )}
          contentContainerStyle={styles.petsListContainer}
          style={styles.petsList}
        />
      )}

      {loading === false && <View style={styles.spacer} />}

      <CustomButton
        label="Registrar Mascota"
        onPress={onPressRegisterPet}
        containerStyle={styles.registerButtonContainer}
        style={styles.registerButton}
        labelStyle={styles.registerButtonText}
      />
    </View>
  );
};

export default PetDetailScreen;
